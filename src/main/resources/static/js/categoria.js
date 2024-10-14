$(document).ready(
    function() {
        // GET REQUEST
        $("#listarCategoria").click(function(event) {
            event.preventDefault();
            ajaxListarCategoria();
        });
    });

function ajaxListarCategoria() {
    $('#getResultDiv').empty();
    $.ajax({
        type : "GET",
        url : "/categoria/listar",
        success : function(result) {
            console.log(result);
            montarTabelaResultado(result);
        },
        error : function(e) {
            //$.toaster({ priority : 'danger', title : 'Categoria', message : e.responseText});
            toast("Categoria", e.responseText, "error");
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
        actionsCell.append(`<button type="button" class="btn btn-warning bi-pencil" onclick="editarCategoria(${item.id})" />`);
        actionsCell.append(`<button type="button" class="btn btn-danger bi-trash" onclick="apagarCategoria(${item.id})" />`);
        row.append(actionsCell);

        row.append('<td>' + item.nome + '</td>');
        tbody.append(row);
    });

    table.append(thead);
    table.append(tbody);

    $('#getResultDiv').html(table);

}

// SUBMIT FORM
$("#categoriaForm").submit(function(event) {

    event.preventDefault();
    ajaxPostCategoria();
});

function ajaxPostCategoria() {
    console.log("ajaxPostCategoria");
    const formData = obterDadosFormularioComoJSON("#categoriaForm");

    // DO POST
    $.ajax({
        type : "POST",
        contentType : "application/json",
        url : "/categoria/gravar/",
        data : formData,
        dataType : 'json',
        success : function(result) {
            //$.toaster({ priority : 'success', title : 'Categoria', message : result.nome + ' gravada com sucesso!'});
            toast("Categoria", result.nome + " gravada com sucesso!", "success");
            $('#categoriaForm').trigger("reset");
            ajaxListarCategoria();
            console.log(result);
        },
        error : function(e) {
            toast("Categoria", e, "error");
            console.log("ERROR: ", e);
        }
    });

}

function ajaxDelCategoria(idCategoria) {
    console.log("ajaxDelCategoria");

    // DO DELETE
    $.ajax({
        type : "DELETE",
        contentType : "application/json",
        url : "/categoria/apagar?idCategoria=" + idCategoria,
        //data : JSON.stringify(formData),
        dataType : 'json',
        success : function(result) {
            //$.toaster({ priority : 'success', title : 'Categoria', message : result.nome + ' gravada com sucesso!'});
            toast("Categoria", "[" + result.nome + "] apagada com sucesso!", "error");
            ajaxListarCategoria();
        },
        error : function(e) {
            toast("Categoria", e, "error");
            console.log("ERROR: ", e);
        }
    });

}

function editarCategoria(idCategotia) {
    $('#categoriaForm').trigger("reset");
    $.ajax({
        type : "GET",
        url : "/categoria/buscar?idCategoria=" + idCategotia,
        success : function(result) {
            console.log(result);
            preencherFormulario(result);
        },
        error : function(e) {
            //$.toaster({ priority : 'danger', title : 'Categoria', message : e.responseText});
            toast("Categoria", e.responseText, "error");
            console.log("ERROR: ", e);
        }
    });
}

function apagarCategoria(idCategoria) {
    ajaxDelCategoria(idCategoria);
}

function preencherFormulario(objeto) {
    // Percorre as propriedades do objeto
    for (const propriedade in objeto) {
        // Verifica se a propriedade é do próprio objeto (não herdada)
        if (objeto.hasOwnProperty(propriedade)) {
            // Seleciona o campo do formulário com o mesmo nome da propriedade
            const campo = $("#" + propriedade);

            // Define o valor do campo com o valor da propriedade
            campo.val(objeto[propriedade]);
        }
    }
}

function obterDadosFormularioComoJSON(formId) {
    const formData = $(formId).serializeArray();
    const jsonData = {};

    $(formData).each(function(index, field) {
        jsonData[field.name] = field.value;
    });

    return JSON.stringify(jsonData);
}