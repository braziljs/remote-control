# Remote Control
Remote Control é uma ferramenta para controlar suas apresentações HTML5 remotamente(Duh).

![logo](http://braziljs.org/wp-content/uploads/2012/11/remote-control.jpg)

*[Como funciona](#como-funciona)
*[Dependências](#dependências)
*[Como instalar](#como-instalar)
*[Como usar](#como-usar)
*[Envolva-se com o projet](#envolva-se-com--projeto)

## Como funciona
O Remote Control é baseado em [WebSockets](https://developer.mozilla.org/en-US/docs/WebSockets), então, você deve ter um Browser moderno, como o Firefox, Chrome ou Opera.  
O celular envia uma mensagem via WebSockets para o servidor.  
O servidor recebe esta mensagem como uma ação que deve ser executada, como por exemplo: 'next' ou 'previous'.  
Esta ação é emitida para a apresentação HTML5.

## Dependências
* [nodejs](http://nodejs.org)
* [socket.io](http://socket.io)
* Um Browser moderno com suporte à WebSockets no seu pc [can i use websockets?](http://caniuse.com/#search=websockets)
* Um Browser moderno com suporte à WebSockets no seu celular [can i use websockets?](http://caniuse.com/#search=websockets)  

## Como instalar
Por enquanto, você deve instalar manulamente :(  

Primeiro, se você não possui o node, instale-o.   
Pesquise do Google, caso você não saiba como fazer isso.  
Instale o socket.io:
```cli
npm install socket.io
```

## Como usar
Rode o arquivo app.js:
```cli
node app.js
```
O servidor ficará disponível na porta 81 [http:localhost:81](http:localhost:81), mas você pode mudar isso se preferir.  
Agora, você precisa adicionar 2 biblioteca JavaScript na sua apresentação HTML5:
```html
<script src="http://localhost:81/socket.io/socket.io.js"></script>
<script src="path/to/remote-control.js"></script>
```

Você está quase pronto para iniciar a apresentação!  
Adicione o código abaixo:
```javascript
var remote = new RemoteControl();
remote.connect('http://localhost:81');
remote.on('next', function() {
	// Próximo Slide
});

remote.on('previous', function() {
	// Slide anterior
});
```
Agora acesse do seu celular o seu IP na porta 81.  
Você deverá ver uma página feia(estamos trabalhando nisso) com 3 botões.  
Se tudo estiver ok, agora você já pode controlar suas apresentações HTML5 com o seu celular.

## Envolva-se com o projeto
- Faça um fork, rode o Remote Control no seu ambiente, avalie todas as funcionalidades e nos envie o seu feedback pela [lista de email](https://groups.google.com/forum/?fromgroups#!forum/braziljs-foundation)
- [Seja um caçador de bugs!](https://github.com/braziljs/remote-control/issues?state=open)
- Se você achou algum bug, [crie uma issue](https://github.com/braziljs/remote-control/issues/new) com a label "bug"
- Se você mesmo quer corrigir este bug(wow!), faça a correção no seu ambiente e [faça um pull-request](https://github.com/braziljs/remote-control/pulls)
- Se você teve uma grande ideia de funcionalidade, [crie uma issue](https://github.com/braziljs/remote-control/issues/new) com a label "enhancement"
- Se você mesmo quer implementar esta funcionalidade (wow! wow!), implemente e [faça um pull-request](https://github.com/braziljs/remote-control/pulls)