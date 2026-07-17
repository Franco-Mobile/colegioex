from django.test import SimpleTestCase
from django.urls import reverse


class HomePageTests(SimpleTestCase):
    def test_home_page_renders_clubs_experience(self):
        response = self.client.get(reverse("inicio"))

        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Descubre tu")
        self.assertContains(response, "Clubes Exitu's")
        self.assertContains(response, "img/clubes/campus-hero.png")
