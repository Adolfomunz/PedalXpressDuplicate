"""
URL configuration for tienda1 project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from PedalXpress import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.index, name='index'),
    path('Iniciar_Sesion', views.Inisesion, name='IniSesion'),
    path('crear_usuario', views.creaUsuario, name='creaUsuario'),
    path('Administracion', views.Admin, name='Admin'),
    path('carritoCompra', views.carritoCompra, name='carritoCompra'),
    path('HistorialCompra', views.HistorialCompras, name='HistorialCompra'),
    path('PerfilUsuario', views.PerfilUsuario, name='PerfilUsuario'),
    path('bicicleta', views.bicicleta, name='bicicleta'),
    path('componentes', views.componentes, name='componentes'),
    path('equipamiento', views.equipamiento, name='equipamiento'),
    path('descripcionP', views.descripcionP, name='descripcionP'),
    path('descripcionP2', views.descripcionP2, name='descripcionP2'),
    path('descripcionP3', views.descripcionP3, name='descripcionP3'),
    path('pago', views.pago, name='pago'),
    path('Recuperar', views.Recuperar, name='Recuperar'),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)