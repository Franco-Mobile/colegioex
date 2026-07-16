from django.views.generic import TemplateView

class Inicio(TemplateView):
    template_name = "inicio/inicio.html"

class Nosotros(TemplateView):
    template_name = "inicio/nosotros.html"
