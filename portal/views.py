from django.views.generic import TemplateView
from portal.data import FEATURED_CLUBS

class Inicio(TemplateView):
    template_name = "inicio/inicio.html"

class Nosotros(TemplateView):
    template_name = "inicio/nosotros.html"

class Clubes(TemplateView):
    template_name = "inicio/clubes.html"
    extra_context = {"featured_clubs": FEATURED_CLUBS}

