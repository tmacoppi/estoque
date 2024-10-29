$(document).ready(
    function() {
        // GET REQUEST
        $("#listarFornecedor").click(function(event) {
            event.preventDefault();
            ajaxListarFornecedor();
        });

        $("#fornecedorForm").submit(function(event) {

            event.preventDefault();
            ajaxPostFornecedor();
        });
/*
        $("#cnpjCpf").keydown(function(){
            try {
                $("#cnpjCpf").unmask();
            } catch (e) {}

            var tamanho = $("#cnpjCpf").val().length;

            if(tamanho < 11){
                $("#cnpjCpf").mask("999.999.999-99");
            } else {
                $("#cnpjCpf").mask("99.999.999/9999-99");
            }

            // ajustando foco
            var elem = this;
            setTimeout(function(){
                // mudo a posição do seletor
                elem.selectionStart = elem.selectionEnd = 10000;
            }, 0);
            // reaplico o valor para mudar o foco
            var currentValue = $(this).val();
            $(this).val('');
            $(this).val(currentValue);
        });
*/
        //$("#cnpjCpf").mask("999.999.999-99", {placeholder: "___.___.___-__"}); // Máscara para CPF
        //$("#cnpjCpf").mask("99.999.999/9999-99", {placeholder: "__.___.___/____-__"}); // Máscara para CNPJ

    });

function ajaxListarFornecedor() {
    $('#getResultDiv').empty();
    $.ajax({
        type : "GET",
        url : "/fornecedor/listar",
        success : function(result) {
            console.log(result);
            montarTabelaResultadoFornecedor(result);
        },
        error : function(e) {
            toast("Fornecedor", e.responseText, "error");
            console.log("ERROR: ", e);
        }
    });
}

function montarTabelaResultadoFornecedor(result) {
    const table = $('<table></table>').addClass('table'); // Create a table element
    const thead = $('<thead></thead>');
    const tbody = $('<tbody></tbody>');

    // Create table header
    thead.append('<tr><th>Ações</th><th>Nome</th><th>E-mail</th></tr>');

    // Create table rows from data
    $.each(result, function(index, item) {
        const row = $('<tr></tr>');

        // Add actions column with icons and links
        const actionsCell = $('<td></td>');
        actionsCell.append(`<button type="button" class="btn btn-warning bi-pencil" onclick="editarFornecedor(${item.id})" />`);
        actionsCell.append(`<button type="button" class="btn btn-danger bi-trash" onclick="apagarFornecedor(${item.id})" />`);
        row.append(actionsCell);

        row.append('<td>' + item.nome + '</td>');
        row.append('<td>' + item.email + '</td>');
        tbody.append(row);
    });

    table.append(thead);
    table.append(tbody);

    $('#getResultDiv').html(table);

}

function ajaxPostFornecedor() {
    console.log("ajaxPostFornecedor");
    const formData = obterDadosFormularioComoJSON("#fornecedorForm");

    if (validarCPF($("#cnpjCpf").val()) || validarCNPJ($("#cnpjCpf").val())) {
        // CPF ou CNPJ válido
        $("#feedback").removeClass("invalid-feedback").addClass("valid-feedback").text("CPF ou CNPJ válido!");
        $("#cnpjCpf").removeClass("is-invalid").addClass("is-valid");
    } else {
        // CPF ou CNPJ inválido
        $("#feedback").removeClass("valid-feedback").addClass("invalid-feedback").text("CPF ou CNPJ inválido.");
        $("#cnpjCpf").removeClass("is-valid").addClass("is-invalid");
        toast("Fornecedor", "CNPJ/CPF inválido!", "error");
        return;
    }

    // DO POST
    $.ajax({
        type : "POST",
        contentType : "application/json",
        url : "/fornecedor/gravar/",
        data : formData,
        dataType : 'json',
        success : function(result) {
            toast("Fornecedor", result.nome + " gravada com sucesso!", "success");
            $('#fornecedorForm').trigger("reset");
            ajaxListarFornecedor();
            console.log(result);
        },
        error : function(e) {
            toast("Fornecedor", e, "error");
            console.log("ERROR: ", e);
        }
    });

}

function ajaxDelFornecedor(idFornecedor) {
    console.log("ajaxDelFornecedor");

    // DO DELETE
    $.ajax({
        type : "DELETE",
        contentType : "application/json",
        url : "/fornecedor/apagar?idFornecedor=" + idFornecedor,
        //data : JSON.stringify(formData),
        dataType : 'json',
        success : function(result) {
            toast("Fornecedor", "[" + result.nome + "] apagada com sucesso!", "error");
            ajaxListarFornecedor();
        },
        error : function(e) {
            toast("Fornecedor", e, "error");
            console.log("ERROR: ", e);
        }
    });

}

function editarFornecedor(idCategotia) {
    $('#fornecedorForm').trigger("reset");
    $.ajax({
        type : "GET",
        url : "/fornecedor/buscar?idFornecedor=" + idCategotia,
        success : function(result) {
            console.log(result);
            preencherFormulario(result);
        },
        error : function(e) {
            toast("Fornecedor", e.responseText, "error");
            console.log("ERROR: ", e);
        }
    });
}

function apagarFornecedor(idFornecedor) {
    ajaxDelFornecedor(idFornecedor);
}
