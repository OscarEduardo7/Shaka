# Proyecto - Manual Técnico

## [PROYECTO - SHAKA] (http://g25-p2.s3-website-us-east-1.amazonaws.com/) <- agregar link de pagina>

- - -

## Datos de los estudiantes:
* 201602469 - Oscar Eduardo Mazariegos López.
* 201612413 - Jennifer Marisol López Orozco.
 
- - -

## Objetivos:

- Crear un medio de comunicación y compensación para las personas mudas.
- Crear una mayor capacidad de expresión por parte de las personas hacia las personas que hablan el lenguaje de señas.
- Lograr solidaridad con las personas sordas para que la sociedad se comprometa en la difusión de la lengua de señas entre las personas oyentes.

## Descripción de arquitectura:

## Presupuesto:

- Cognito:
  - El costo por cada usuario activo mensual en la plataforma es de 0.0055 USD.
  - Se esperan aproximadamente 1,000 usuarios para el primer mes, el cual nos dejaria un costo de 11.00 USD.
- Lambda:
  - Utilizando una memoria de 128Mb para la función y se esperan 1 millon de solicitudes al mes, lo cual tiene un costo de 0.20 USD.
- API Gateway:
  - Ya que se cobra al llegar a las 333 millones de solicitudes, el costo sera de 0.29 USD al mes.
- EC2:
  - Utilizando el modelo de baja instancia para una instancia EC2, el costo sera de 3.04 USD al mes.
- DynamoDB:
  - Para la base de datos solo se almacenan datos de imagenes, por lo que el uso solo abarca el almacenamiento, el costo sera de 5.00 USD.
- S3:
  - Al utilizar el servicio S3 estandar, con 50TB/mes, el costo sera de 0.023 USD por GB.
- Amazon Translate:
  - Translate cobra por caracter, por lo que estimando 1 millon de caracteres, el costo seria de 15 USD mensual. Siempre teniendo variaciónes.
- Amazon Polly:
  - Al igual que Amazon translate, se espera que el costo no supere los 4 USD al mes, ya que se cobra por caracter.

### *Investigación de servicios:*
- Cognito:
  * Amazon Cognito le permite incorporar de manera rápida y sencilla el registro, inicio de sesión y control de acceso de usuarios a sus aplicaciones web y móviles. Amazon Cognito cuenta con escalado para millones de usuarios y admite el inicio de sesión mediante proveedores de identidad social, como Apple, Facebook, Google y Amazon, así como con proveedores de identidad empresarial a través de SAML 2.0 y OpenID Connect.  

- Lambda:
  * AWS Lambda es una plataforma informática sin servidor impulsada por eventos proporcionada por Amazon como parte de Amazon Web Services. Es un servicio informático que ejecuta código en respuesta a eventos y administra automáticamente los recursos informáticos requeridos por ese código.

- API Gateway:
  * Amazon API Gateway es un servicio de AWS para la creación, publicación, mantenimiento, monitoreo y protección de API REST, HTTP y WebSocket a cualquier escala. Los desarrolladores pueden crear API que accedan a AWS o a otros servicios web, así como los datos almacenados en la nube de AWS. Como desarrollador de API de API Gateway, puede crear API para su uso en sus propias aplicaciones de cliente. También puede ofrecer sus API a otros desarrolladores de aplicaciones externos.

- EC2:
  * Amazon Elastic Compute Cloud es una parte central de la plataforma de cómputo en la nube de la empresa Amazon.com denominada Amazon Web Services. EC2 permite a los usuarios alquilar computadores virtuales en los cuales pueden ejecutar sus propias aplicaciones.

- DynamoDB:
  * Amazon DynamoDB es un servicio de base de datos noSQL ofrecido por Amazon como parte de Amazon Web Services. DynamoDB expone un modelo de datos similar y deriva su nombre de Dynamo, pero tiene una implementación subyacente diferente.

- S3:
  * Amazon Simple Storage Service (Amazon S3) es un servicio de almacenamiento de objetos que ofrece escalabilidad, disponibilidad de datos, seguridad y rendimiento líderes en el sector. Gracias a Amazon S3, clientes de todos los tipos y sectores pueden almacenar y proteger cualquier volumen de datos para los más variados fines, como usarlos en lagos de datos, sitios web, aplicaciones móviles, procesos de copia de seguridad y restauración, operaciones de archivado, aplicaciones empresariales, dispositivos IoT y análisis de big data.

- Amazon Translate:
  * Amazon Translate es un servicio de traducción automática neuronal que ofrece traducción de idiomas rentable, personalizable, de alta calidad y rápida. La traducción automática neuronal es una forma de automatización de traducciones entre idiomas que usa modelos de aprendizaje profundo para ofrecer traducciones más naturales y precisas que los algoritmos estadísticos tradicionales y de traducción basados en reglas.

- Amazon Polly:
  * Amazon Polly es un servicio en la nube que convierte el texto en un segmento hablado muy realista. Puede utilizar Amazon Polly para desarrollar aplicaciones que aumenten la participación y mejoren la accesibilidad. Amazon Polly admite diferentes idiomas e incluye una serie de voces realistas, lo que le permite crear aplicaciones que pueden usarse en distintas ubicaciones y emplear la voz más adecuada para sus clientes. Con Amazon Polly, solo paga por el texto que se sintetiza. También puede almacenar en caché el habla generada con Amazon Polly y reproducirla sin ningún costo adicional.


1. **Comparar rostro:** Con esta funcion detectamos si el usuario el cual quiere ingresar a la plataforma es la misma persona quien creo la cuenta. Tiene que existir un parecido de 90%.

2. **Detectar etiquetas:** Con esta funcion detectamos las diferentes caracteristicas que tenga la foto de perfil del usuario. Indicando  la edad, si utiliza lentes, hasta su genero.
  De igual manera las fotos que se suben a la plataforma son examinadas y estas se suben a un album especifico el cual es el resultado de la consulta con rekognition.

3. **Extraer texto:** Con esta funcion se puede obtener el texto de alguna imagen.

### **Amazon Translate**
Herramienta utilizada para traducir el texto que contenta alguna imagen de las cuales se suben a nuestros albumes.

- - -
## Usuarios IAM utilizados
Los siguientes usuarios de **IAM** fueron utilizados para obtener los servicios de AWS.

1. Usuario **DynamoDB**
   * Politicas de permisos Asociadas:
     *  AmazonDynamoDBFullAccess.

2. Usuario **S3**
   * Politicas de permisos Asociadas:
     *  AmazonS3FullAccess.

3. Usuario **Lex**
   * Politicas de permisos Asociadas:
     *  AmazonLexFullAccess.

4. Usuario **Rekognition**
   * Politicas de permisos Asociadas:
     *  AmazonRekognitionFullAccess.

5. Usuario **Translate**
   * Politicas de permisos Asociadas:
     *  AmazonTranslateFullAccess.

---
## Capturas de pantalla:

### Capturas **S3**

* Bucket Pagina Web:
  <img src="imagenesDocu\bucketPagina.PNG" border="2" align="center"/>

* Bucket Fotos:
  <img src="imagenesDocu\bucketFotos.PNG" border="2" align="center"/>

* Politica aplicada a buckets:
  <img src="imagenesDocu\politicas Bucket.PNG" border="2" align="center"/>

### Capturas **EC2**

* Instancias utilizadas:
  <img src="imagenesDocu\Instancias.PNG" border="2" align="center"/>

* Segurity Groups asociados:
  <img src="imagenesDocu\segurity.png" border="2" align="center"/>

### Capturas **DynamoDB**

* Tablas utilizadas:
  <img src="imagenesDocu\tablasDynamo.PNG" border="2" align="center"/>

* Tabla usuarios:
  <img src="imagenesDocu\tablaUsername.PNG" border="2" align="center"/>


### Capturas **Aplicacion Web**
<img src="imagenesDocu\login.PNG" border="2" align="center"/>

- - -
<img src="imagenesDocu\camara.PNG" border="2" align="center"/>

- - -

<img src="imagenesDocu\registro.PNG" border="2" align="center"/>

- - -

<img src="imagenesDocu\perfil1.png" border="2" align="center"/>

- - -
<img src="imagenesDocu\extraer.PNG" border="2" align="center"/>

- - -
<img src="imagenesDocu\chat.PNG" border="2" align="center"/>
- - -
<img src="imagenesDocu\chat3.PNG" border="2" align="center"/>

- - -

<img src="imagenesDocu\subirfoto2.PNG" border="2" align="center"/>

- - -

<img src="imagenesDocu\perfilEdit.PNG" border="2" align="center"/>

- - -

<img src="imagenesDocu\fotos.PNG" border="2" align="center"/>

- - -

<img src="imagenesDocu\detalle.PNG" border="2" align="center"/>

- - -

<img src="imagenesDocu\foto.PNG" border="2" align="center"/>

- - -
- - -






