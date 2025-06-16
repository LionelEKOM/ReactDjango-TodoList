from django.urls import path
from .views import TodoDetailView, TodoDeleteView, TodoCreateView, TodoUpdateView, TodoListView

urlpatterns = [
    # Collection endpoints
    path('todos/', TodoListView.as_view(), name='todo-list'),  # GET, POST
    path('todos/create/', TodoCreateView.as_view(), name='todo-create'),  # POST
    
    # Instance endpoints
    path('todos/<int:pk>/', TodoDetailView.as_view(), name='todo-detail'),  # GET
    path('todos/<int:pk>/update/', TodoUpdateView.as_view(), name='todo-update'),  # PUT, PATCH
    path('todos/<int:pk>/delete/', TodoDeleteView.as_view(), name='todo-delete'),  # DELETE
]
