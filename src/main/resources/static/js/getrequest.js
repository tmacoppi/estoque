$(document).ready(
		function() {

			// GET REQUEST
			$("#listarCategoria").click(function(event) {
				event.preventDefault();
				ajaxListarCategoria();
			});

			// DO GET
			function ajaxListarCategoria() {
				console.log(window.location);
				$.ajax({
					type : "GET",
					url : window.location + "categoria/",
					success : function(result) {
						console.log(result);
						$('#listaCategoria').empty();
						$.each(result, function(i, categoria) {
							console.log(categoria);
							var categoriaT = "- Id = " + categoria.id
									+ ", Nome = " + categoria.nome;
							$('#listaCategoria').append(categoriaT)
						});
						console.log("Success: ", result);
					},
					error : function(e) {
						$("#getResultDiv").html("<strong>Error</strong>");
						console.log("ERROR: ", e);
					}
				});
			}
		})
