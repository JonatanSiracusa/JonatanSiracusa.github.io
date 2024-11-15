---
layout: post
title: Descarga de Series Históricas de Precios
date: 2024-11-14 20:30:00 +0300
#image:  02.jpg
tags: DataScience DataAnalytics Finances ByMA NYSE Nasdaq S&P500 Python
published: true
---
Todo análisis y producto de la *Economía del Conocimiento* tienen como materia prima básica a los ***Datos***.

Aunque muchas veces se tienden a subestimar, es absolutamente crítico realizar todas las acciones necesarias para lograr trabajar con datos lo más confiables y sólidos posibles.

***

> **"Los datos son el nuevo petróleo."** - Clive Humby (Científico de Datos)

***

En este artículo, vamos a usar Python para extraer y procesar, desde *Yahoo Finance*, los precios históricos de determinadas acciones cotizantes en el mercado de capitales argentino.<br><br>


### Descarga de los datos

Los tickers de las acciones a ser descargadas, y sus correspondientes códigos de Yahoo Finance, son tomados desde la el archivo *tickers.xlsx*, que se encuentra en el repositorio de GitHub.<br><br>


### Limpieza y Procesamiento

Una vez descargadas las series de precios, limpiamos y procesamos los datos.

Con el fin de tener información para realizar futuros análisis, realizamos los siguientes cálculos sobre el ***precio de cierre ajustado*** descargado de cada acción:

1. **Rendimiento** diario simple (discreto).
2. **Rendimiento** diario logarítmico (continuo).
3. **Volatilidad** anual en función de los rendimientos logarítmicos y las ultimas 40 ruedas de mercado.<br><br>


Creamos 2 tablas, conteniendo lo siguiente:

1. Precios de cierre ajustados de cada acción.
2. Precios de cierre ajustados de cada acción, rendimiento diario simple, rendimiento diario log y volatilidad. Usamos los sufijos “***_sr***”, “***_lr***” y “***_v40***”, luego de cada ticker, respectivamente.<br><br>


### Salida de Datos

Generamos archivos en formato ***.csv*** y ***.xlsx***, de cada una de las tablas, para ser descargados de forma local.<br><br>


### Acceso al código

Es posible acceder al notebook y ejecutarlo desde *Google Colab*, así como también descargarlo desde el repositorio de *GitHub* haciendo
    ***<a href="https://github.com/JonatanSiracusa/download-historical-series.git" target="_blank" title="Hace click para ir al repositorio">click aquí.
    </a>*** <br><br>


{% include download-historical-prices.html %}
