<img src="https://img.shields.io/github/languages/count/alrlima/nlw2020-mobile?style=flat-square" />
<img src="https://img.shields.io/github/languages/top/alrlima/nlw2020-mobile?style=flat-square" />

# Intro
[Next Level Week (NLW)](https://nextlevelweek.com) é uma iniciativa da [Rocket Seat](https://rocketseat.com.br/). Um evento 100% online e gratuito que ocorre em uma semana e tem como objetivo acelerar a evolução dos devs participantes para um nível mais elevado de desenvolvimento.
Nesta versão de 1 a 7 de Junho de 2020 o projeto utilizou NodeJS, React e React-Native.

## Projeto
A proposta de projeto era o desenvolvimento de um aplicativo para cadastro e consulta de pontos de coletas de produtos recicláveis.
> ESTE REPOSITÓRIO REPRESENTA A VERSÃO MOBILE DA APLICAÇÃO DESENVOLVIDO EM REACT NATIVE

## Pré-requisitos
- node

## Etapas

>#### REACT-NATIVE
>Interpreta o código java script e executa como nativo usando um engine interno que vai junto com a aplicação.

Para execução do projeto sem necessidade de instalação de outras aplicações android studio e xcode, será utilizado o expo.
O [Expo](http://expo.io) vai disponibilizar os acessos básicos de um device e executará o código.
```sh
npm install -g expo-cli
expo init mobile
```
Durante a criação do projeto escolha a opção blank (*)typescript

Por padrão o Expo já dispóe de ferramenta para importação de fontes de textos
```sh
expo install expo-font @expo-google-fonts/ubuntu @expo-google-fonts/roboto
```

### Criando estrutura de navegação da aplicação
[React Navigation](https://reactnavigation.org/docs/getting-started)
```sh
npm install @react-navigation/native
npm install @react-navigation/stack
```

### Outras libs utilizadas no projeto
```sh
expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view
```

### Executando o projeto
```sh
expo start
```

### Trablhando com Mapas e SVG
```sh
expo install reacty-native-maps
expo install expo-constants
expo install react-native-svg
```

### Acessando Web-services
```sh
npm install axios
```

### Geolocalização e E-mail
```sh
expo install expo-location
expo install expo-mail-composer
```

### Build
Para buildar o projeto, é necessário login no Expo.  
Durante o processo de build os dados serão enviados para os servidores da Expo e lá serão compilados e disponibilizados. Tanto Android quanto IOS.
```sh
expo build:android -t apk
```
Também é possível fazer a publicação diretamente no Play Store e App Store.  
Veja documentação oficial do expo clicando [aqui!](https://docs.expo.io/).
Para publicação, utilize o type bundle ao invés de apk.

### Publish
Você também poderá testar o resultado da aplicação utilizando o Expo Host.
```sh
expo publish -t android
```
No final será exibido o link com o qrCode para acesso a aplicação.
Para funcionamento deve ser instalado o Expo Project.
