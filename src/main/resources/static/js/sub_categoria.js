function ajaxListarSubCategoria() {
    console.log("ajaxListarSubCategoria");
    $('#getResultDiv').empty();
    $.ajax({
        type : "GET",
        url : "/sub-categoria/listar",
        success : function(result) {
            console.log(result);
            montarTabelaResultadoSubCategoria(result);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // código a ser executado em caso de erro
            toast("Sub-Categoria", textStatus, "error");
            console.error('Erro:', textStatus, errorThrown);
            console.error('Detalhes do erro:', jqXHR.responseText);
        }
    });
}

function ajaxPostSubCategoria() {
    console.log("ajaxPostSubCategoria");
    const formData = obterDadosFormularioComoJSON("#subCategoriaForm");

    console.log(formData);

    // DO POST
    $.ajax({
        type : "POST",
        contentType : "application/json",
        url : "/sub-categoria/gravar/",
        data : formData,
        dataType : 'json',
        success : function(result) {
            toast("Sub-Categoria", "'" + result.nome + "' gravada com sucesso!", "success");
            $('#subCategoriaForm').trigger("reset");
            ajaxListarSubCategoria();
            console.log(result);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // código a ser executado em caso de erro
            toast("Categoria", textStatus, "error");
            console.error('Erro:', textStatus, errorThrown);
            console.error('Detalhes do erro:', jqXHR.responseText);
        }
    });
}

function montarTabelaResultadoSubCategoria(result) {
    const table = $('<table></table>').addClass('table'); // Create a table element
    const thead = $('<thead></thead>');
    const tbody = $('<tbody></tbody>');

    // Create table header
    thead.append('<tr><th>Ações</th><th>Categoria</th><th>Nome</th></tr>');

    // Create table rows from data
    $.each(result, function(index, item) {
        const row = $('<tr></tr>');

        // Add actions column with icons and links
        const actionsCell = $('<td></td>');
        actionsCell.append(`<button type="button" class="btn btn-warning bi-pencil" onclick="editarSubCategoria(${item.id})" />`);
        actionsCell.append(`<button type="button" class="btn btn-danger bi-trash" onclick="apagarSubCategoria(${item.id})" />`);
        row.append(actionsCell);

        row.append('<td>' + item.categoria.nome + '</td>');
        row.append('<td>' + item.nome + '</td>');
        tbody.append(row);
    });

    table.append(thead);
    table.append(tbody);

    $('#getResultDiv').html(table);

}