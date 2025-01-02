-- Check if the database exists and drop it
IF EXISTS (SELECT name FROM sys.databases WHERE name = N'Cars')
BEGIN
    DROP DATABASE Cars;
    PRINT 'Database Cars dropped successfully.';
END
GO

-- Create the Cars database
CREATE DATABASE Cars;
GO

-- Use the Cars database
USE Cars;
GO

-- Check if the table exists and drop it
IF OBJECT_ID(N'dbo.Cars', N'U') IS NOT NULL
BEGIN
    DROP TABLE dbo.Cars;
    PRINT 'Table Cars dropped successfully.';
END
GO

-- Create the Cars table
CREATE TABLE Cars (
    ID INT IDENTITY PRIMARY KEY,
    Make NVARCHAR(50),
    Model NVARCHAR(50),
    Year INT,
    Price DECIMAL(10, 2)
);
GO

-- Insert data into the Cars table
INSERT INTO Cars (Make, Model, Year, Price)
VALUES
('Toyota', 'Corolla', 2020, 20000.50),
('Ford', 'Mustang', 2021, 45000.75),
('Tesla', 'Model 3', 2022, 50000.00),
('Chevrolet', 'Camaro', 2019, 30000.00),
('Honda', 'Civic', 2020, 22000.00),
('BMW', 'X5', 2023, 60000.00),
('Nissan', 'Altima', 2021, 25000.00),
('Hyundai', 'Elantra', 2020, 21000.00),
('Kia', 'Optima', 2022, 23000.00),
('Mazda', 'CX-5', 2023, 32000.00),
('Audi', 'A4', 2019, 35000.00),
('Mercedes-Benz', 'C-Class', 2022, 42000.00),
('Volkswagen', 'Passat', 2021, 27000.00),
('Subaru', 'Impreza', 2020, 24000.00),
('Jeep', 'Cherokee', 2023, 33000.00),
('Dodge', 'Charger', 2021, 37000.00),
('Chevrolet', 'Impala', 2020, 29000.00),
('Ford', 'Explorer', 2023, 45000.00),
('Tesla', 'Model S', 2022, 75000.00),
('Honda', 'Accord', 2020, 26000.00),
('Toyota', 'Camry', 2021, 27000.00),
('BMW', '3 Series', 2022, 41000.00),
('Audi', 'Q5', 2023, 54000.00),
('Nissan', 'Rogue', 2021, 28000.00),
('Hyundai', 'Tucson', 2022, 29000.00),
('Kia', 'Sportage', 2023, 31000.00),
('Mazda', 'Mazda3', 2020, 22000.00),
('Volkswagen', 'Jetta', 2021, 24000.00),
('Subaru', 'Outback', 2022, 35000.00),
('Jeep', 'Wrangler', 2023, 40000.00),
('Dodge', 'Durango', 2021, 38000.00),
('Chevrolet', 'Tahoe', 2022, 60000.00),
('Ford', 'F-150', 2023, 50000.00),
('Tesla', 'Model X', 2022, 90000.00),
('Honda', 'Pilot', 2021, 34000.00),
('Toyota', 'Highlander', 2020, 35000.00),
('BMW', '5 Series', 2023, 55000.00),
('Audi', 'A6', 2022, 62000.00),
('Nissan', 'Murano', 2021, 32000.00),
('Hyundai', 'Santa Fe', 2020, 31000.00),
('Kia', 'Sorento', 2022, 33000.00),
('Mazda', 'MX-5', 2023, 28000.00),
('Volkswagen', 'Tiguan', 2021, 30000.00),
('Subaru', 'Forester', 2022, 34000.00),
('Jeep', 'Compass', 2023, 29000.00),
('Dodge', 'Ram 1500', 2021, 48000.00),
('Chevrolet', 'Silverado', 2022, 52000.00),
('Ford', 'Escape', 2023, 32000.00),
('Tesla', 'Model Y', 2022, 65000.00),
('Honda', 'HR-V', 2021, 24000.00);
GO