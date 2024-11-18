$(document).ready(
    function() {
        // GET REQUEST
        $("#listarCliente").click(function(event) {
            event.preventDefault();
            ajaxListarCliente();
        });

        $("#clienteForm").submit(function(event) {
            event.preventDefault();
            ajaxPostCliente();
        });
    });

function ajaxListarCliente() {
    $('#getResultDiv').empty();
    $.ajax({
        type : "GET",
        url : "/cliente/listar",
        success : function(result) {
            console.log(result);
            montarTabelaResultadoCliente(result);
        },
        error : function(e) {
            toast("Cliente", e.responseText, "error");
            console.log("ERROR: ", e);
        }
    });
}

function montarTabelaResultadoCliente(result) {
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
        actionsCell.append(`<button type="button" class="btn btn-warning bi-pencil" onclick="editarCliente(${item.id})" />`);
        actionsCell.append(`<button type="button" class="btn btn-danger bi-trash" onclick="apagarCliente(${item.id})" />`);
        row.append(actionsCell);

        row.append('<td>' + item.nome + '</td>');
        row.append('<td>' + item.email + '</td>');
        tbody.append(row);
    });

    table.append(thead);
    table.append(tbody);

    $('#getResultDiv').html(table);

}

function ajaxPostCliente() {
    console.log("ajaxPostCliente");
    const formData = obterDadosFormularioComoJSON("#clienteForm");

    if (validarCPF($("#cnpjCpf").val()) || validarCNPJ($("#cnpjCpf").val())) {
        // CPF ou CNPJ válido
        $("#feedback").removeClass("invalid-feedback").addClass("valid-feedback").text("CPF ou CNPJ válido!");
        $("#cnpjCpf").removeClass("is-invalid").addClass("is-valid");
    } else {
        // CPF ou CNPJ inválido
        $("#feedback").removeClass("valid-feedback").addClass("invalid-feedback").text("CPF ou CNPJ inválido.");
        $("#cnpjCpf").removeClass("is-valid").addClass("is-invalid");
        toast("Cliente", "CNPJ/CPF inválido!", "error");
        return;
    }

    // DO POST
    $.ajax({
        type : "POST",
        contentType : "application/json",
        url : "/cliente/gravar/",
        data : formData,
        dataType : 'json',
        success : function(result) {
            toast("Cliente", result.nome + " gravada com sucesso!", "success");
            $('#clienteForm').trigger("reset");
            ajaxListarCliente();
            console.log(result);
        },
        error : function(e) {
            toast("Cliente", e, "error");
            console.log("ERROR: ", e);
        }
    });

}

function ajaxDelCliente(idCliente) {
    console.log("ajaxDelCliente");

    // DO DELETE
    $.ajax({
        type : "DELETE",
        contentType : "application/json",
        url : "/cliente/apagar?idCliente=" + idCliente,
        //data : JSON.stringify(formData),
        dataType : 'json',
        success : function(result) {
            toast("Cliente", "[" + result.nome + "] apagada com sucesso!", "error");
            ajaxListarCliente();
        },
        error : function(e) {
            toast("Cliente", e, "error");
            console.log("ERROR: ", e);
        }
    });

}

function editarCliente(idCategotia) {
    $('#clienteForm').trigger("reset");
    $.ajax({
        type : "GET",
        url : "/cliente/buscar?idCliente=" + idCategotia,
        success : function(result) {
            console.log(result);
            preencherFormulario(result);
        },
        error : function(e) {
            toast("Cliente", e.responseText, "error");
            console.log("ERROR: ", e);
        }
    });
}

function apagarCliente(idCliente) {
    ajaxDelCliente(idCliente);
}
