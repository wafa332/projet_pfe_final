# Use the official Python image as the base image
FROM python:3.10-slim


# Set the working directory in the container
WORKDIR /app

# Copy the requirements file to the working directory
COPY requirements.txt /app/

# Install dependencies
RUN pip install -r requirements.txt

# Copy the entire project to the working directory
COPY . /app/

# Expose the port the app runs on (Django default is 8000)
EXPOSE 8000

# Run the Django development server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
