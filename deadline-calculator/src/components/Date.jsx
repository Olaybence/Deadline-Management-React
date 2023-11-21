export default function Date({date}) {
    let tasks = [
        "create the project",
        "init React",
    ]
    
    return <div className="tasks">
        {tasks.map(item => 
            <button>item</button>
        )}
    </div>;
}