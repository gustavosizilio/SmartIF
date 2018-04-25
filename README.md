# Configuração

Baixar o conteúdo deste projeto.

Instalar o pacote de modulos: 'node_modules', acho que o comando 'npm install' resolver.

Se não:

> basta criar um projeto com o link https://facebook.github.io/react-native/docs/getting-started.html;

> importar a pasta node_modules para o presente projeto;

> instalar o react-native-maps com o comando: npm install react-native-maps --save.

Ou então:

> criar um projeto com o link https://facebook.github.io/react-native/docs/getting-started.html;

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

Para testar se está tudo ok, basta excecutar o projeto:
> cd PastaProjeto
> * PastaProjeto> react-native run-android

