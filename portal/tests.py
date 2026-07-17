from django.contrib.staticfiles import finders
from django.test import SimpleTestCase
from django.urls import reverse

from portal.data import FEATURED_CLUBS


class HomePageTests(SimpleTestCase):
    def test_home_page_renders_clubs_experience(self):
        response = self.client.get(reverse("inicio"))

        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Descubre tu")
        self.assertContains(response, "Clubes Exitu's")
        self.assertContains(response, "img/clubes/campus-hero.png")
        self.assertContains(response, 'class="club-feature', count=12)
        self.assertContains(response, "Gimnasia artística")
        self.assertContains(response, "Robótica y programación")
        self.assertContains(response, "Finanzas")
        self.assertContains(response, "css/pages/inicio.css")
        self.assertContains(response, "js/pages/inicio.js")

    def test_featured_clubs_have_unique_slugs_and_images(self):
        slugs = [club["slug"] for club in FEATURED_CLUBS]

        self.assertEqual(len(FEATURED_CLUBS), 12)
        self.assertEqual(len(slugs), len(set(slugs)))
        for club in FEATURED_CLUBS:
            self.assertIsNotNone(finders.find(club["image"]), club["name"])