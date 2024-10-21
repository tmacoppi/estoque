function ajaxListarCategoria() {
    $('#getResultDiv').empty();
    $.ajax({
        type : "GET",
        url : "/categoria/listar",
        success : function(result) {
            console.log(result);
            montarTabelaResultadoCategoria(result);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // código a ser executado em caso de erro
            toast("Categoria", textStatus, "error");
            console.error('Erro:', textStatus, errorThrown);
            console.error('Detalhes do erro:', jqXHR.responseText);
        }
    });
}

function ajaxCarregarComboCategoria() {
    $('#getResultDiv').empty();
    $.ajax({
        type : "GET",
        url : "/categoria/listar",
        success : function(result) {
            console.log(result);
            montarComboCategoria(result);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // código a ser executado em caso de erro
            toast("Categoria", textStatus, "error");
            console.error('Erro:', textStatus, errorThrown);
            console.error('Detalhes do erro:', jqXHR.responseText);
        }
    });

}

function montarComboCategoria(result) {
    var selectBox = $('#selectCategoria');
    selectBox.empty(); // Limpa o conteúdo atual da select box
    selectBox.append('<option value="">Selecione uma Categoria</option>'); // Adiciona uma opção padrão

    $.each(result, function(index, item) {
        selectBox.append('<option value="' + item.id + '">' + item.nome + '</option>');
    });
}

function montarTabelaResultadoCategoria(result) {
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
            toast("Categoria", "'" + result.nome + "' gravada com sucesso!", "success");
            $('#categoriaForm').trigger("reset");
            ajaxListarCategoria();
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
            toast("Categoria", "[" + result.nome + "] apagada com sucesso!", "error");
            ajaxListarCategoria();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // código a ser executado em caso de erro
            toast("Categoria", textStatus, "error");
            console.error('Erro:', textStatus, errorThrown);
            console.error('Detalhes do erro:', jqXHR.responseText);
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
        error: function(jqXHR, textStatus, errorThrown) {
            // código a ser executado em caso de erro
            toast("Categoria", textStatus, "error");
            console.error('Erro:', textStatus, errorThrown);
            console.error('Detalhes do erro:', jqXHR.responseText);
        }
    });
}

function apagarCategoria(idCategoria) {
    ajaxDelCategoria(idCategoria);
}
