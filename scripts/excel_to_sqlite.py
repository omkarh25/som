import pandas as pd
import sqlite3
import os

def create_sqlite_db():
    # Create directory if it doesn't exist
    db_path = 'DBs/Seredipity/BookKeeping'
    os.makedirs(db_path, exist_ok=True)
    
    # Connect to SQLite database
    conn = sqlite3.connect(f'{db_path}/Kaas.db')
    
    try:
        # Read Excel sheets
        xl = pd.ExcelFile('Cleaned_Kaas_4Dec.xlsx')
        
        # Process each sheet
        for sheet_name in xl.sheet_names:
            # Read the sheet
            df = pd.read_excel(xl, sheet_name)
            
            # Convert column names to lowercase and remove spaces
            df.columns = [col.lower().replace(' ', '_') for col in df.columns]
            
            # Write to SQLite
            table_name = sheet_name.lower()
            df.to_sql(table_name, conn, if_exists='replace', index=False)
            
            # Create indices for commonly queried columns
            cursor = conn.cursor()
            if table_name == 'transactions':
                cursor.execute('CREATE INDEX IF NOT EXISTS idx_trno ON transactions(trno)')
                cursor.execute('CREATE INDEX IF NOT EXISTS idx_date ON transactions(date)')
                cursor.execute('CREATE INDEX IF NOT EXISTS idx_department ON transactions(department)')
            elif table_name == 'accounts':
                cursor.execute('CREATE INDEX IF NOT EXISTS idx_accid ON accounts(accid)')
            elif table_name == 'freedom':
                cursor.execute('CREATE INDEX IF NOT EXISTS idx_trno ON freedom(trno)')
                cursor.execute('CREATE INDEX IF NOT EXISTS idx_date ON freedom(date)')
        
        print("Database created successfully!")
        
        # Print table information
        cursor = conn.cursor()
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
        tables = cursor.fetchall()
        
        print("\nDatabase Schema:")
        for table in tables:
            table_name = table[0]
            print(f"\nTable: {table_name}")
            cursor.execute(f"PRAGMA table_info({table_name});")
            columns = cursor.fetchall()
            for col in columns:
                print(f"  {col[1]} ({col[2]})")
    
    except Exception as e:
        print(f"Error: {str(e)}")
    finally:
        conn.close()

if __name__ == "__main__":
    create_sqlite_db()
