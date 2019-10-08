# Instruções de uso

## Instalação

- É necessária a instalação do pacote ```react-native-cli``` (de forma global)
- Recomendo a instalação do pacote ```yarn``` (de forma global também)
- Ambos devem ser instalados pelo NPM

---

## Executando a aplicação

- É necessário que o path para o SDK do android esteja nas variáveis de ambiente da maquina junto com o ADB
- Baixe o SDK do android junto com suas licensas através do Android Studio
- Execute os seguintes comandos para iniciar o packager do react

```shell
$ # Baixar as dependências
$ yarn
$ # Iniciar o packager
$ react-native start
```

- Para a executar a aplicação, utilize os seguintes comandos (em uma nova instância do terminal)

```shell
$ # Para android
$ react-native run-android
$ # Para iOS
$ react-native run-ios
```