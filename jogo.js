var rodada=1;
var matriz=Array(3);

// Criando as chaves referente as linhas 
// Cada chave vai receber um array de ate 3 posições 
matriz['a']= Array(3);
matriz['b']= Array(3);
matriz['c']= Array(3);

//cada chave vai receber uma posição
matriz['a'][1]=0;
matriz['a'][2]=0;
matriz['a'][3]=0;

matriz['b'][1]=0;
matriz['b'][2]=0;
matriz['b'][3]=0;

matriz['c'][1]=0;
matriz['c'][2]=0;
matriz['c'][3]=0;

//Quando estiver carregado iremos executar a função
$(document).ready( function(){

	// Quando o botão iniciar for acionado, iremos começar o jogo
	$('#btn_jogo').click(function(){

		//Valida se todos os apelidos foram digitados 
		if($('#apelido_jogador1').val() == '' || $('#apelido_jogador2').val() == '' ){

			//criei este rotorno de mensagem para dentro do html 
			$('#mensagem').html("O apelido de todos os jogadores devem ser preenchidos.");

			return false;
		}

		//Retornar os apelidos digitados nos avatares dos jogadores 
		$('#nome_jogador1').html($('#apelido_jogador1').val()); //Span possui conteudo interno de html 
		$('#nome_jogador2').html($('#apelido_jogador2').val()); //Span possui conteudo interno de html 
		$('#mensagem').html(""); 


		//Trabalhar as exibições dos paineis 
		$('#pagina_inicial').hide(); //Oculta o cabeçalho e mostra o palco do jogo 
		$('#palco_jogo').show();
		$('#informativo').css('background','#ADD8E6'); //o jogador 1 sempre vai iniciar 
		


	}); 

	

	//Todas as jogadas terão uma classe em comum mas com id diferente
	$('.jogada').click( function(){

		var clicado = this.id;
		jogada(clicado);
		$('#'+clicado).off(); // Desabilita para nao poder marcar duas vezes
	});

	//Recuperar o clique              //javascrpit 
	function jogada(id){
		var icone = '';
		var ponto = 0; 

		
		//O jogador jogará na rodada par ou na rodada impar 
		if((rodada % 2)==1){
			//o jogador 1 irá marcar -1 e o x
			//$('#informativo').html(rodada); 
			ponto = -1;
			icone = 'url("imagens/marcacao_1.png")';
			$('#informativo').css('background','#F5FFFA'); //quando ele marcar vou devolver  a vez dele para o outro jogador

		}else{
			// o jogador 2 irá marcar 1 e a bolinha 
			ponto = 1;
			icone = 'url("imagens/marcacao_2.png")';
			$('#informativo1').css('background','#F5FFFA'); //quando ele marcar vou devolver  a vez dele para o outro jogador
		}

		
		rodada ++;

		//vou controlar quem joga de acordo com  a rodada 
		if ((rodada % 2)==0) {  $('#informativo1').css('background','#ADD8E6'); } else { $('#informativo').css('background','#ADD8E6'); }

		// Associar a marcação do jogador com a div 
		$('#'+id).css('background-image',icone);   // A função css permite passar dois valores, sendo o atributo e o valor css 


		// associar o campo escolhido para a matriz 
		var linha_coluna = id.split('-');  // posição 0 = linha  posição 1 = coluna 
		matriz[linha_coluna[0]][linha_coluna[1]] = ponto; 

		//Analisa a pontuação do jogador 
		verifica_combinacao();

		//descomente para mostrar o log das marcações 
		//console.log(matriz);
	}

	//verifica combinação 
	function verifica_combinacao(){

		//verifica na horizontal 
		//vamos usar um laço de repetição para checar 
		pontos = 0 ; 
		for(var i =1;i<=3;i++){
			pontos=pontos + matriz['a'][i];
		}
			ganhador(pontos);

		pontos = 0 ; 
		for(var i =1;i<=3;i++){
			pontos=pontos + matriz['b'][i];
		}
			ganhador(pontos);

        pontos = 0 ; 
		for(var i =1;i<=3;i++){
			pontos=pontos + matriz['c'][i];
		}
			ganhador(pontos);

		//verifica na vertical 
		//vamos usar um laço de repetição para checar 
		pontos = 0;
		for(var l =1;l<=3;l++){
			pontos = 0;                   //para cada nova coluna devo zerar o ponto 
			pontos+= matriz['a'][l];      //iremos somar a coluna e verificar 
			pontos+= matriz['b'][l];
			pontos+= matriz['c'][l];

			ganhador(pontos);
		}

		//verifica na diagonal
		pontos = 0;
		pontos = matriz['a'][1]+matriz['b'][2]+matriz['c'][3];
		ganhador(pontos);

		pontos = 0;
		pontos = matriz['a'][3]+matriz['b'][2]+matriz['c'][1];
		ganhador(pontos);




	}

	//verifica se houve ganhador 
	function ganhador(pontos){
		if (pontos==-3){ 
			//Trocar as cores de acordo com o ganhador 
			$('#ganhador').html("Jogador 1 é o vencedor!"); 
			$('#ganhador').css('color','red'); 

			$('.jogada').off(); // desabilita para nao poder marcar nada depois do ganhador 
			$('#start').html("Jogar novamente"); 

			//Desabilita as cores 
			$('#informativo').css('background','#F5FFFA');
			$('#informativo1').css('background','#F5FFFA');

		}else if(pontos== 3){
			//Trocar as cores de acordo com o ganhador 
			$('#ganhador').html("Jogador 2 é o vencedor!"); 
			$('#ganhador').css('color','blue'); 

			$('.jogada').off();  // desabilita para nao poder marcar nada depois do ganhador 
			$('#start').html("Jogar novamente"); 

			//Desabilita as cores 
			$('#informativo').css('background','#F5FFFA');
			$('#informativo1').css('background','#F5FFFA');
		}
	}

	//iniciar o jogo novamente 
   $('#start').click( function(){

    window.location.reload(true);

   });

});