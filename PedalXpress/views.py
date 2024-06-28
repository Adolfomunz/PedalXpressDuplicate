from django.shortcuts import render, redirect
from .models import Product


def index(request):
    return render(request, 'pages/index.html')

def Inisesion(request):
    return render(request, 'pages/InicioSesion.html')


def creaUsuario(request):
    return render(request, 'pages/creaUsuario.html')



def Admin(request):
    return render(request, 'pages/Admi.html')




#Cambioo aquuiii#
def carritoCompra(request):
    productos = [
        {'name': 'Producto 1', 'price': 100, 'image': 'url1'},
        {'name': 'Producto 2', 'price': 200, 'image': 'url2'},
        # Añade más productos según sea necesario
    ]
    total = sum(producto['price'] for producto in productos)
    return render(request, 'pages/carritoCompra.html', {'productos': productos, 'total': total})


def HistorialCompras(request):
    return render(request, 'pages/HistorialCompras.html')

def PerfilUsuario(request):
    return render(request, 'pages/PerfilUsuario.html')

def bicicleta(request):
    return render(request, 'pages/bicicleta.html')

def descripcionP(request):
    return render(request, 'pages/descripcionP.html')

def descripcionP2(request):
    return render(request, 'pages/descripcionP2.html')

def descripcionP3(request):
    return render(request, 'pages/descripcionP3.html')

def pago(request):
    return render(request, 'pages/pago.html')

def componentes(request):
    return render(request, 'pages/componentes.html')

def equipamiento(request):
    return render(request, 'pages/equipamiento.html')

def Recuperar(request):
    return render(request, 'pages/Recuperar.html')