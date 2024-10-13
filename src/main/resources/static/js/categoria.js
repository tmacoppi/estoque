$(document).ready(
    function() {
        ajaxListarCategoria();
    });

function ajaxListarCategoria() {
    $('#getResultDiv').empty();
    $.ajax({
        type : "GET",
        url : window.location + "categoria/",
        success : function(result) {
            montarTabelaResultado(result)
            //$.toaster({ priority : 'success', title : 'Categoria', message : 'Categorias listadas com sucesso!'});
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
        actionsCell.append(`<button type="button" class="btn btn-danger bi-trash" th:onclick="|location.href='/usuario/apagar/${item.id}'|" />`);
        actionsCell.append(`<button type="button" class="btn btn-warning bi-pencil" th:onclick="|location.href='/usuario/editar/${item.id}'|" />`);
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
    // Prevent the form from submitting via the browser.
    event.preventDefault();
    ajaxPostCategoria();
});

function ajaxPostCategoria() {
    console.log("ajaxPostCategoria");

    // PREPARE FORM DATA
    var formData = {
        nome : $("#nome").val()
    }

    // DO POST
    $.ajax({
        type : "POST",
        contentType : "application/json",
        url : window.location + "categoria/gravar/",
        data : JSON.stringify(formData),
        dataType : 'json',
        success : function(result) {
            //$.toaster({ priority : 'success', title : 'Categoria', message : result.nome + ' gravada com sucesso!'});
            toast("Categoria", result.nome + " gravada com sucesso!", "success");
            ajaxListarCategoria();
            console.log(result);
        },
        error : function(e) {
            alert("Error!")
            console.log("ERROR: ", e);
        }
    });

}