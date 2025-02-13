
/**
 * Dashboard component that renders a simple dashboard view.
 * It displays a paragraph with the text "Dashboard".
 * @returns {React.ReactElement} A div containing the dashboard content.
 */

const Dashboard: React.FC = ()=> {
    return(
        <div className="w-full h-full flex items-center justify-center">
            <p>
                Dashboard
            </p>
        </div>);
}

export default Dashboard;