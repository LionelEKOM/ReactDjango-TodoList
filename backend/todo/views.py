from django.shortcuts import render
from rest_framework import generics
from .models import Todo
from .serializers import TodoSerializer

# Create
class TodoCreateView(generics.CreateAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

# Read
class TodoListView(generics.ListAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

class TodoDetailView(generics.RetrieveAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

# Update
class TodoUpdateView(generics.UpdateAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

# Delete
class TodoDeleteView(generics.DestroyAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

    

