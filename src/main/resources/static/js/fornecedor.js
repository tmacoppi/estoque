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

    });

function ajaxListarFornecedor() {
    $('#getResultDiv').empty();
    $.ajax({
        type : "GET",
        url : "/fornecedor/listar",
        success : function(result) {
            console.log(result);
            montarTabelaResultado(result);
        },
        error : function(e) {
            toast("Fornecedor", e.responseText, "error");
            console.log("ERROR: ", e);
        }
    });
}

function montarTabelaResultado(result) {
    const table = $('<table></table>').addClass('table'); // Create a table element
    const thead = $('<thead></thead>');
    const tbody = $('<tbody></tbody>');

    // Create table header
    thead.append('<tr><th>Ações</th><th>Nome</th></tr>');

    // Create table rows from data
    $.each(result, function(index, item) {
        const row = $('<tr></tr>');

        // Add actions column with icons and links
        const actionsCell = $('<td></td>');
        actionsCell.append(`<button type="button" class="btn btn-warning bi-pencil" onclick="editarFornecedor(${item.id})" />`);
        actionsCell.append(`<button type="button" class="btn btn-danger bi-trash" onclick="apagarFornecedor(${item.id})" />`);
        row.append(actionsCell);

        row.append('<td>' + item.nome + '</td>');
        tbody.append(row);
    });

    table.append(thead);
    table.append(tbody);

    $('#getResultDiv').html(table);

}

function ajaxPostFornecedor() {
    console.log("ajaxPostFornecedor");
    const formData = obterDadosFormularioComoJSON("#fornecedorForm");

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
