import React, {useState} from 'react';
import {useKeycloak} from '@react-keycloak/web';
import {KeycloakInitOptions} from "keycloak-js";

const ReportPage: React.FC = () => {

    const {keycloak, initialized} = useKeycloak();
    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const downloadReport = async () => {
        if (!keycloak?.token) {
            setError('Not authenticated');
            return;
        }

        const fetchReports = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/reports`, {
                    headers: {
                        'Authorization': `Bearer ${keycloak.token}`
                    }
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }

                const data = await response.json();
                setEntries(data.entries); // Сохраняем данные в состояние
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false); // Завершаем загрузку
            }
        };

        fetchReports();
    };

    if (!initialized) {
        const keycloakInitOptions: KeycloakInitOptions = {
            pkceMethod: "S256"

        }
        keycloak.init(keycloakInitOptions)
        console.log("Keycloak initialized");
    }

    if (!keycloak.authenticated) {
        console.log("Authentication failed. Show login form");
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <button
                    onClick={() => keycloak.login()}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Login
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="p-8 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-6">Usage Reports</h1>

                <button
                    onClick={downloadReport}
                    disabled={loading}
                    className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${
                        loading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                >
                    {loading ? 'Generating Report...' : 'Download Report'}
                </button>

                {error && (
                    <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
                        {error}
                    </div>
                )}
                {
                    entries.length > 0 && (
                        <div className="container mx-auto p-6">
                            <table className="table-auto w-full bg-white shadow-md rounded-lg border border-blue-100 overflow-hidden">
                                <thead className="bg-blue-500 text-white">
                                <tr>
                                    <th className="px-6 py-3 text-left">ID</th>
                                    <th className="px-6 py-3 text-left">Name</th>
                                    <th className="px-6 py-3 text-left">Value</th>
                                </tr>
                                </thead>
                                <tbody>
                                {entries.map((entry) => (
                                    <tr className="odd:bg-blue-100 even:bg-blue-50" key={`${entry["id"]}-${entry["name"]}`}> {}
                                        <td className="px-6 py-4">{entry["id"]}</td>
                                        <td className="px-6 py-4">{entry["name"]}</td>
                                        <td className="px-6 py-4">{entry["value"]}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>

                    )
                }
            </div>
        </div>

    );
};

export default ReportPage;
    