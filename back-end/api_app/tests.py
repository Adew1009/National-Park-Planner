from django.test import TestCase
from django.urls import reverse
from unittest.mock import patch
from rest_framework.test import APIClient

import json

# Create your tests here.


class npsProjectTest(TestCase):

    def setUp(self):
        self.client = APIClient()

    @patch("requests.get")
    def test_nps_img_api_view(self, mock_get):
        yell = 'yell'
        preview_url = "https://example.com/image.png"
        mock_response = type("MockResponse", (), {"json": lambda self: {
            'data': [{'images': [{'url': preview_url}]}]
        }})
        mock_get.return_value = mock_response()
        response = self.client.get(reverse("nps_project", args=[yell]))
        with self.subTest():
            self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.content), preview_url)

    # @patch("requests.get")
    # def test_pokeball_img_api_view(self, mock_get):
    #     ball = 'pokeball'
    #     preview_url = "https://example.com/image.png"
    #     mock_response = type("MockResponse", (), {"json": lambda self: {
    #                          "icons": [{"thumbnail_url": preview_url}]}})
    #     mock_get.return_value = mock_response()
    #     response = self.client.get(reverse("noun_api", args=[ball]))
    #     with self.subTest():
    #         self.assertEqual(response.status_code, 200)
    #     self.assertEqual(json.loads(response.content), preview_url)
