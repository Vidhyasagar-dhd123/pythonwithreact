from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def HomeView(request):
    return HttpResponse("How are you")