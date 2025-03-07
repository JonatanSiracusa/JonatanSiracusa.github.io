---
layout: post
title: Guía para descargar Series de Datos Financieros con Python de forma escalable
date: 2024-11-14 20:30:00 +0300
image:  portada_1.jpg
tags: DataScience DataAnalytics Finances ByMA NYSE Nasdaq S&P500 Python
published: true
---
# Motivación

Todo análisis y producto de la *Economía del Conocimiento* tienen como **materia prima básica** a los ***Datos***.

Aunque muchas veces se tienden a subestimar, es absolutamente crítico realizar todas las acciones necesarias para lograr **trabajar con datos lo más confiables y sólidos posibles**.

Al mismo tiempo, en un mundo cada vez más dinámico y complejo, necesitamos que nuestras **herramientas y trabajo sean escalables**.

***

> **"Los datos son el nuevo petróleo."** - Clive Humby (*Científico de Datos*)

***

Para cubrir esta necesidad que tenemos **como profesionales**, podemos crear herramientas para realizar estas tareas **apalancándonos en el uso de tecnología**.

Vamos a utilizar **Python** para **extraer**, desde *Yahoo Finance*, y **procesar** los **precios históricos** de determinadas acciones cotizantes en el mercado de capitales argentino (*ByMA*).

Es válido mencionar que, dada la **estructura del programa** y la **versatilidad** que nos ofrece **Python**, podemos **extraer datos de cuantos activos deseemos y de distintas fuentes**.
<br><br>


# Flujo de Trabajo

El flujo de trabajo se resume a las siguientes tareas:

1. Especificar los parametros que el notebook requiere.

2. Verificar la fuente de datos.

3. Descargar y preparar de los datos.

4. Limpieza de los datos.

5. Transformación y procesamiento de los datos.

6. Exportar los datos limpios y procesados.
<br><br>


## Parámetros

El primer paso involucra al usuario, quien debe especificar los parametros con los que va a trabajar el programa.


#### 1. Selección de Activos

Necesitamos especificar los tickers de los activos que deseamos descargar y procesar en la variable `TICKERS`. Estos tickers, son los cuales vamos a llamar luego a los activos descargados.

Por ejemplo: si descargamos datos de la acción de Grupo Financiero Galicia, probablemente deseemos llamar a ese activo por su ticker en ByMA ("GGAL"), y no por el código con el que la fuente de datos identifica a la acción cotizante en ByMA ("GGAL.BA").

Luego, necesitamos especificar el codigo de cada activo con el que la fuente de datos utilizada identifica a cada uno de los activos, en la variable `TICKERS_YF`. Estos deben especificarse en el mismo orden en el que fueron declarados en la variable TICKERS ya que, al momento de renombrar los tickers, serán sustituidos en el orden en `TICKERS`.


#### 2. Intervalo de tiempo de la serie de datos

Para determinar el intervalo de tiempo contamos con dos variables: `START_DATE` y `END_DATE`.

Estas variables reciben datos en formato de texto (*string*) y en formato de fecha `YYYY-MM-DD`, siendo la primera la fecha de inicio y la segunda de finalización.

La segunda variable tiene como valor por defecto el día en el que se realiza la consulta, por lo que puede dejarse vacia `END_DATE = ""`. 


#### 3. Datos exportables

Contamos con tres variables: `EXPORT_DATA`, `OUTPUT_NAME_1` y `OUTPUT_NAME_2`.

Necesitamos expresar si deseamos que los datos sean descargados, lo hacemos mediante la variable `EXPORT_DATA` que debe recibir un valor de boolean: `True` para exportar los datos o `False` para no hacerlo.

Luego, completamos los nombres de los archivos que se descargaran. Para esto, debemos especificar el nombre del primer descargable, que contiene los precios de Cierre Ajustados (*Adj Close*) de los activos, a traves de la variable `OUTPUT_NAME_1`.

Y, por ultimo, completamos el nombre del segundo descargable por medio de la variable `OUTPUT_NAME_2`, que contiene los cierres ajustados (*Adj Close*), los rendimientos simples y logarítimicos, y la volatilidad de las ultimas 40 ruedas anualizada. Todo calculado en base a los *Adj. Close*.

<div style="text-align: center;">
    <img src="/images/Image 001.jpg" alt="Parameters" width="700">
</div>
<br>


## Fuente y descarga de datos

En este caso, estamos utilizando Yahoo Finance, a modo de ejemplo genérico. Aunque, podemos utilizar la fuente de datos que deseemos.

Para modificar la fuente de datos, solo debemos adaptar la funcion `descargar_datos_yf()`, que recibe como argumentos los tickers en el formato que la fuente de datos requiere, la fecha de inicio y la fecha de finalización.

<div style="text-align: center;">
    <img src="/images/Image 002.jpg" alt="Download Function" width="700">
</div>


Al **modularizar** la descarga de los datos, **facilitamos el cambio de fuente de datos** cuando lo necesitemos.
<br><br>


## Limpieza de datos

Ahora es cuando el debido orden de los tickers en `TICKERS` toma importancia, ya que cambiamos el nombre de los codigos de *YahooFinance* por los tickers de nuestra comodidad. En este caso, nombramos a cada activo como se lo nombra en ByMA.

Seleccionaremos solo los precios de cierre ajustados (*Adj Close*), filtrandolos del resto de los tipos de precios y eliminando las columnas MultiIndex del DataFrame. De esta manera, generamos un dataset con fechas como indice y columnas solo con los nombres de los activos.

<div style="text-align: center;">
    <img src="/images/Image 003.jpg" alt="Data Cleaning" width="500">
</div>

Paso siguiente, agregamos un indice numerico incremental en la primer columna, en caso de que se necesite en el futuro, y reemplazamos todos los valores negativos o vacíos por cero.

Por ultimo, realizamos un Checkpoint guardando el dataset obtenido hasta el momento a modo de backup.
<br><br>


## Procesamiento de datos

Una vez que tenemos el dataset con los datos y el formato que necesitabamos, comenzamos a realizar los calculos deseados.

En este caso, agregamos tres columnas a la derecha de cada activo. En las respectivas columnas insertamos los siguientes calculos:

1.  Rendimiento simple, respecto de la rueda anterior.
2.  Rendimiento logarítmico, respecto de la rueda anterior.
3.  Volatilidad (desvío estándar) anualizada, respecto de las ultimas 40 ruedas.

<div style="text-align: center;">
    <img src="/images/Image 004.jpg" alt="Processing data" width="700">
</div>

Como es de buena práctica, realizamos otro Checkpoint a modo de backup.
<br><br>


## Exportar datos

En esta última etapa, exportamos los datasets generados en formato `.xlsx` y `.csv`, con los respectivos nombres. 

Como ya se comento, el primer descargable contiene los **precios de cierre ajustado**, por lo que le asignamos el dataset que se guardo en el primer Checkpoint. 

El segundo descargable, contiene **precios de cierre ajustado, rendimientos y volatilidad**, por lo que recibe el dataset que se guardo en el segundo Checkpoint.

<div style="text-align: center;">
    <img src="/images/Image 005.jpg" alt="Processing data" width="600">
</div>
<br>


# Síntesis del Proyecto

En resumen, este **enfoque modular** nos permite utilizar el programa para **descargar series de precios de todo tipo**, de un **intervalo de tiempo determinado** y de **todos los activos que deseemos**.

La mayor ventaja reside en que es **ESCALABLE** y, por lo tanto, **podemos extenderlo a la cantidad de activos, tipos de precios e intervalos que necesitemos**.

Es posible **acceder al notebook y ejecutarlo** desde *Google Colab*, así como también **descargarlo desde el repositorio de *GitHub*** haciendo
    ***<a href="https://github.com/JonatanSiracusa/downloading-historical-prices.git" target="_blank" title="Hace click para ir al repositorio"><u>click aquí</u>.
    </a>***
<br><br>


# Ideas para Expandir este Proyecto

Podemos transformar este notebook en un **script** de Python programado para **ejecutarse automáticamente en un horario determinado**.

Determinar que los **tickers a descargar o los activos descargados puedan tomarse / almacenarse** en un archivo de **Excel**, una hoja de **Google Sheets** o un repositorio de **GitHub** que **podamos modificar más facilmente** conforme a nuestras necesidades. 

También es posible **modificar la fuente de datos**.

Programar que los datos no se descarguen, sino que **alimenten otro script o notebook** de Python que realice **otras acciones**, o que simplemente sean **visualizados** a traves de una hoja de **Google Sheet**, **Power BI**, **Tableau**, **Streamlit** y cualquier herramienta similar.

Incluso sería posible que los datos **se envíen** por **e-mail, Slack, Telegram** o cualquier otro canal de comunicación.
<br><br>

Como vemos, las **<u>posibilidades son casi infinitas</u>**, limitadas únicamente por nuestras necesidades e imaginación.
<br><br>

***

Si tenes ideas para mejorar este flujo de trabajo y que otros casos de usos se le podrían dar a este enfoque, **¡Contactame!**

Soy un nerd dentro del cuerpo de un financiero, y me apasiona combinar lo mejor de la Ciencia de Datos, las Finanzas y el Management para crear valor argegado en los procesos de negocios dentro y fuera de una organización.

Quisiera conocer tu opinión. Podes encontrarme en [**<u>LinkedIn</u>**](https://www.linkedin.com/in/ajsiracusa), [**<u>Twitter</u>**](https://x.com/jonasiracusa), [**<u>Medium</u>**](https://jonatansiracusa.medium.com/), [**<u>GitHub</u>**](https://github.com/JonatanSiracusa)  y mi [**<u>Website</u>**](https://jonatansiracusa.github.io/).

