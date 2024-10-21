from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json

# Create your views here.
@csrf_exempt
def soil_test(request):
    if request.method == 'POST':
        try:
            # Load data from the request body
            data = json.loads(request.body)
            print(data)

            # Extract fields from the received data
            user_name = data.get('user_name')
            admin_name = data.get('admin')
            date = data.get('date')
            Water_Percentage = data.get('Water_Percentage')
            Air_Percentage = data.get('Air_Percentage')
            sand = data.get('sand')
            silt = data.get('silt')
            clay = data.get('clay')
            Organic_Matter_Percentage = data.get('Organic_Matter_Percentage')
            pH = data.get('pH')
            Nitrogen_Content = data.get('Nitrogen_Content')
            Phosphorus_Content = data.get('Phosphorus_Content')
            Potassium_Content = data.get('Potassium_Content')

            # Create a dictionary with relevant data for the AI model
            data123 = {
                "Water_Percentage": Water_Percentage,
                "Air_Percentage": Air_Percentage,
                "sand": sand,
                "silt": silt,
                "clay": clay,
                "Organic_Matter_Percentage": Organic_Matter_Percentage,
                "pH": pH,
                "Nitrogen_Content": Nitrogen_Content,
                "Phosphorus_Content": Phosphorus_Content,
                "Potassium_Content": Potassium_Content,
            }

            # Set up the AI model
            genai.configure(api_key=GEMINI_API_KEY)
            generation_config = {
                "temperature": 0,
                "top_p": 0.95,
                "top_k": 64,
                "max_output_tokens": 8192,
                "response_mime_type": "application/json",
            }

            model = genai.GenerativeModel(
                model_name="gemini-1.5-pro",
                generation_config=generation_config,
                system_instruction="""
                You are a soil tester. 
                I am going to give you a JSON object with data like this: 
                Water Percentage (%), Air Percentage (%), Mineral Particles (%) (sand, silt, and clay), 
                Organic Matter Percentage (%), pH Level of Soil, Nitrogen Content (%), Phosphorus Content (%), Potassium Content (%).
                
                Based on this data, provide me a JSON object with the following keys:
                soil_condition, soil_fertility_percentage, recommended_crop, nutrients_needed, and other_suggestions.
                """,
            )

            # Start chat and send message
            history = []
            chat_session = model.start_chat(history=history)
            response = chat_session.send_message(json.dumps(data123))

            # Parse the response text to JSON
            response_json = json.loads(response.text)

            # Extract the data from the AI model's response
            soil_condition = response_json['soil_condition']
            soil_fertility = int(response_json['soil_fertility_percentage'])
            recommended_crop = response_json['recommended_crop']
            nutrients_needed = response_json['nutrients_needed']
            other_suggestions = response_json['other_suggestions']

            # Insert data into APPOINTMENT_DETAILS model
            APPOINTMENT_DETAILS.objects.create(
                admin_name=admin_name,
                user_name=user_name,
                appointment_date = date,
                soil_condition=soil_condition,
                soil_fertility=soil_fertility,
                recommended_crop=recommended_crop,
                nutrients_needed=nutrients_needed,
                other_suggestions=other_suggestions
            )

            return JsonResponse(response_json, safe=False)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)

    return JsonResponse({'error': 'Invalid request method'}, status=400)

def get_csrf_token(request):
    csrf_token = get_token(request)
    return JsonResponse({'csrfToken': csrf_token})  