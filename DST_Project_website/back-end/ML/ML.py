import sys
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MinMaxScaler

#
if len(sys.argv) < 5:
    print("Usage: python ML.py <Book_Average_Rating> <Sale_Price> <Sale_Rank> <Revenue_Percentage>")
    sys.exit(1)

try:
    # Fetch inputs from command-line arguments
    input_values = [float(arg) for arg in sys.argv[1:4]]  # أول ثلاث قيم
    revenue_percentage = float(sys.argv[4])  # القيمة الرابعة

  
    csv_path = r"C:\Users\Data\Desktop\DST_Project\back-end\ML\Clean_Books.csv"

   
    data = pd.read_csv(csv_path).drop(columns=['Unnamed: 0'])
    temp = data[['Book_Average_Rating', 'Sale_Price', 'Sale_Rank', 'Gross_Sales']]

   
    scaler = MinMaxScaler()
    x_scaled = pd.DataFrame(scaler.fit_transform(temp), columns=temp.columns)
    y_scaled = x_scaled['Gross_Sales']
    x_scaled = x_scaled.drop(columns=['Gross_Sales'])

   
    x_train, x_test, y_train, y_test = train_test_split(x_scaled, y_scaled, test_size=0.2, random_state=42)
    model = RandomForestRegressor(n_estimators=1000, random_state=42)
    model.fit(x_train, y_train)

    
    x = pd.DataFrame([input_values], columns=temp.columns[0:-1])  # تحضير البيانات المدخلة
    y_pred = model.predict(x)
    y = y_pred * (temp['Gross_Sales'].max() - temp['Gross_Sales'].min()) + temp['Gross_Sales'].min()

   
    revenue = y * revenue_percentage / 100

    
    print(f'Gross Sales After Denormalization: {y[0]}')
    print(f'Revenue: {revenue[0]}')

except FileNotFoundError as e:
    print(f"Error: File not found - {e}")
    sys.exit(1)

except ValueError as e:
    print(f"Error: Invalid input - {e}")
    sys.exit(1)
