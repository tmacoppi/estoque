$(document).ready(
    function() {

        // GET REQUEST
        $("#listarCategoria").click(function(event) {
            event.preventDefault();
            ajaxListarCategoria();
        });

        // DO GET
        function ajaxListarCategoria() {
            $('#getResultDiv').empty();
            $.ajax({
                type : "GET",
                url : window.location + "categoria/",
                success : function(result) {
                    var categoriaT = "";
                    montarTabelaResultado(result)
                    console.log("Success: ", result);
                    showToast("Categorias listadas com sucesso!");
                },
                error : function(e) {
                    $("#getResultDiv").html("<strong>Error</strong>");
                    console.log("ERROR: ", e);
                }
            });
        }

        function montarTabelaResultado(result) {
            const table = $('<table></table>').addClass('table'); // Create a table element
            const thead = $('<thead></thead>');
            const tbody = $('<tbody></tbody>');

            // Create table header
            thead.append('<tr><th>ID</th><th>Nome</th></tr>');

            // Create table rows from data
            $.each(result, function(index, item) {
                const row = $('<tr></tr>');
                row.append('<td>' + item.id + '</td>');
                row.append('<td>' + item.nome + '</td>');
                tbody.append(row);
            });

            table.append(thead);
            table.append(tbody);
            $('#getResultDiv').html(table);
        }

        function showToast(mensagem) {
            $.toast({
                heading: 'Information',
                text: mensagem,
                showHideTransition: 'slide',
                icon: 'info'
            })
        }
    })
