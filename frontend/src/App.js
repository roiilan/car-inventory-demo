import React, { useState, useEffect, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import {
    ClientSideRowModelModule,
    NumberEditorModule,
    TextEditorModule,
    TextFilterModule,
    ValidationModule,
    ModuleRegistry,
    themeQuartz,
} from 'ag-grid-community';
import { fetchCars, upsertCar, generateToken } from './services/apiService';

import './App.css';

// Register AG Grid modules
ModuleRegistry.registerModules([
    ClientSideRowModelModule,
    NumberEditorModule,
    TextEditorModule,
    TextFilterModule,
    ValidationModule,
]);

// Define a custom AG Grid theme with specific colors and styles
const myTheme = themeQuartz.withParams({
    backgroundColor: 'rgb(249, 245, 227)', // Table background color
    foregroundColor: 'rgb(126, 46, 132)', // Text color
    headerTextColor: 'rgb(204, 245, 172)', // Header text color
    headerBackgroundColor: 'rgb(209, 64, 129)', // Header background color
    oddRowBackgroundColor: 'rgba(0, 0, 0, 0.03)', // Odd row background color
    headerColumnResizeHandleColor: 'rgb(126, 46, 132)', // Resize handle color
});

const App = () => {
    // State to store cars data, API token, and update status
    const [cars, setCars] = useState([]);
    const [token, setToken] = useState('');
    const [isUpdated, setIsUpdated] = useState(false);

    // Fetch token and car data on component mount
    useEffect(() => {
        const init = async () => {
            try {
                const generatedToken = await generateToken();
                setToken(generatedToken);
                const carsData = await fetchCars(generatedToken);
                setCars(carsData);
            } catch (error) {
                console.error('Initialization error:', error.message);
            }
        };
        init();
    }, []);

    // Handle updates when a cell value is edited
    const handleCellEdit = async (event) => {
        const updatedCar = event.data;
        try {
            await upsertCar(updatedCar, token);
            setIsUpdated(true); // Show the success popup
            console.log('Car updated successfully:', updatedCar);
            setTimeout(() => setIsUpdated(false), 3000); // Hide the popup after 3 seconds
        } catch (error) {
            console.error('Error updating car:', error.message);
        }
    };

    // Column definitions for the AG Grid
    const columnDefs = useMemo(() => [
        { field: 'ID', editable: false, headerName: 'ID', width: 60 }, // Non-editable column
        { field: 'Make', editable: true, headerName: 'Make', filter: true }, // Editable with filter
        { field: 'Model', editable: true, headerName: 'Model', filter: true }, // Editable with filter
        { field: 'Year', editable: true, headerName: 'Year' }, // Editable column
        { field: 'Price', editable: true, headerName: 'Price' }, // Editable column
    ], []);

    // Default column settings
    const defaultColDef = useMemo(() => ({
        editable: true, // Allow editing by default
        resizable: true, // Allow resizing columns
    }), []);

    return (
        <div className="app-container">
            {/* Header section with title and instructions */}
            <header className="app-header">
                <h1>Car Inventory Table</h1>
                <p>Please double-click a cell to edit and press Enter to save changes.</p>
            </header>

            {/* AG Grid table container */}
            <div className="grid-container ag-theme-quartz">
                <AgGridReact
                    modules={[
                        ClientSideRowModelModule,
                        NumberEditorModule,
                        TextEditorModule,
                        TextFilterModule,
                        ValidationModule,
                    ]}
                    rowData={cars} // Data to display in the table
                    columnDefs={columnDefs} // Column definitions
                    theme={myTheme} // Apply the custom theme
                    defaultColDef={defaultColDef} // Apply default column settings
                    onCellValueChanged={handleCellEdit} // Handle edits
                />
            </div>

            {/* Popup to indicate successful updates */}
            {isUpdated && (
                <div className="popup">
                    <p>Update completed successfully!</p>
                </div>
            )}

            <div class="padding-bottom"></div>

        </div>
    );
};

export default App;
