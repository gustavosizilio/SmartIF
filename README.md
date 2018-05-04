# Pré requisitos
> Ler: https://facebook.github.io/react-native/docs/getting-started.html.

# Configuração de Mapas

Baixar o conteúdo deste projeto.

Instalar o pacote de modulos: 'node_modules', acho que o comando 'npm install' resolve.

## Se não, com este Projeto baixado:

> basta criar um projeto com o link https://facebook.github.io/react-native/docs/getting-started.html (react-native init NameProject);

> mover ou copiar a pasta 'node_modules' do projeto recém criado para pasta do presente projeto;

> instalar o react-native-maps com o comando 'npm install react-native-maps --save' ou 'npm install'.

## Ou então com um novo Projeto:

> criar um projeto com o link https://facebook.github.io/react-native/docs/getting-started.html (react-native init NameProject);

> instalar o react-native-maps com o comando: npm install react-native-maps --save;

> configurar as dependências:

    * No arquivo 'build.grandle' em 'android/app/build.gradle', configurar as dependências:
    
    dependencies {
      implementation fileTree(dir: "libs", include: ["*.jar"])
      implementation "com.android.support:appcompat-v7:+"
      implementation "com.facebook.react:react-native:+"  // From node_modules
      implementation project(":react-native-maps")
    }

    * No arquivo 'settings.gradle' em 'android/settings.gradle', adicionar a inclusão:
    
    include ':react-native-maps'
    project(':react-native-maps').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-maps/lib/android')

    * No arquivo 'AndroidManifest.xml' em 'android/app/src/main/AndroidManifest.xml', adicionar a tag <meta-data> dentro da tag <application>:
    
    <application>
    <!-- You will only need to add this meta-data tag, but make sure it's a child of application -->
      <meta-data
          android:name="com.google.android.geo.API_KEY"
          android:value="API_ANDROID_KEY"/>
    </application>
    
    Lembrar que 'API_ANDROID_KEY' é uma chave que vai ser gerada em: https://developers.google.com/maps/documentation/android-api/?hl=pt-br
    
    * Adicionar o 'import com.airbnb.android.react.maps.MapsPackage;' and 'new MapsPackage()' no arquivo 'MainApplication.java' em 'android\app\src\main\java\com\smartif\MainApplication.java' da seguinte forma:
    
    import com.airbnb.android.react.maps.MapsPackage;
    ...
    @Override
     protected List<ReactPackage> getPackages() {
         return Arrays.<ReactPackage>asList(
                 new MainReactPackage(),
                 new MapsPackage()
         );
     }
     
     * configurar permissões no arquivo Manifest.xml acima mencionado para usar gps:
     <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
     
     * No LINUX, configurar as variáveis de ambiente em '$HOME/.bash_profile':
     
         1. export ANDROID_HOME=$HOME/Android/Sdk
         2. export PATH=$PATH:$ANDROID_HOME/tools
         3. export PATH=$PATH:$ANDROID_HOME/platform-tools
         
     * No WINDOWS, configurar a variável ANDROID_HOME, com o caminho do Sdk, e Path, com os locais de build-tools e plataform-tools:
     
         1. c:\Users\YOUR_USERNAME\AppData\Local\Android\Sdk         
         2. c:\Users\YOUR_USERNAME\AppData\Local\Android\Sdk\build-tools
         3. c:\Users\YOUR_USERNAME\AppData\Local\Android\Sdk\platform-tools

> Talvez ainda seja necessário rodar esse comando 'npm install babel-preset-expo --save'.

Talvez ainda precise rodar outro comando:
> npm install babel-preset-expo --save

Para quem estiver usando o GENYMOTION ainda precisa fazer outras configurações: https://inthecheesefactory.com/blog/how-to-install-google-services-on-genymotion/en

# Configuração da Navegação

A solução da comunidade para navegação é uma biblioteca autônoma que permite aos desenvolvedores configurar as telas de um aplicativo com apenas algumas linhas de código.

O primeiro passo é instalar no projeto:
> npm install --save react-navigation

No Windows talvez seja preciso instalar uma versão expecifica em razão de problemas ssh:
> npm install --save react-navigation@1.0.0-beta.27

Para testar se está tudo ok, basta excecutar o projeto:
> cd PastaProjeto

> PastaProjeto> react-native run-android



