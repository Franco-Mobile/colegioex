from django.urls import path
from portal.views import Inicio, Nosotros, Clubes

urlpatterns = [
    path("", Inicio.as_view(), name="inicio"),
    path("nosotros/", Nosotros.as_view(), name="nosotros"),
    path("clubes/", Clubes.as_view(), name="clubes"),
]