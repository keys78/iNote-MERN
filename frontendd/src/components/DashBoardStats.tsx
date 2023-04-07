import { useAppSelector } from '@/network/hooks';
import React from 'react'
import { Pie } from 'react-chartjs-2';






const DashBoardStats = () => {
    const { user } = useAppSelector((state) => state.user);

    // Total number of boards
    const totalBoards = user?.boards.length;

    // Total number of tasks
    const totalTasks = user?.boards?.reduce((total, board) => {
        return total + board?.notes.length;
    }, 0);

    // Total number of subtasks
    const totalSubtasks = user?.boards?.reduce((total, board) => {
        return total + board?.notes.reduce((taskTotal: any, task: any) => {
            return taskTotal + task.subTasks.length;
        }, 0);
    }, 0);


    // const UserCharts = ({ user }) => {
    const getTaskData = () => {
        const taskData = {
            labels: [],
            datasets: [{
                data: [],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
            }],
        };
        const priorityCount = {};
        let totalCount = 0;
        user?.boards.forEach(board => {
            board?.notes.forEach(task => { // changed "notes" to "tasks"
                priorityCount[task.priority] = (priorityCount[task.priority] || 0) + 1;
                totalCount += 1;
            });
        });
        for (const priority in priorityCount) {
            taskData.labels.push(priority);
            taskData.datasets[0].data.push(priorityCount[priority]);
        }
        return taskData;
    };


    const getSubtaskData = () => {
        const subtaskData = {
            labels: [],
            datasets: [{
                data: [],
                backgroundColor: ['#FF6384', '#36A2EB'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB'],
            }],
        };
        let completedCount = 0;
        let totalCount = 0;
        user?.boards.forEach(board => {
            board.notes.forEach((task: any) => {
                task.subTasks.forEach((subtask: any) => {
                    if (subtask.isCompleted) {
                        completedCount += 1;
                    }
                    totalCount += 1;
                });
            });
        });
        subtaskData.labels = ['Completed', 'Not Completed'];
        subtaskData.datasets[0].data = [completedCount, totalCount - completedCount];
        return subtaskData;
    };

    const options = {
        legend: {
          position: 'right',
          labels: {
            boxWidth: 15,
            fontStyle: 'bold',
            fontColor: 'black',
            textTransform: 'capitalize'
          }
        },
       
      };
      


    return (
        <div>
            <div>
                <article>Total Boards:</article>
                <article>{totalBoards}</article>
            </div>
            <div>
                <article>Total Tasks:</article>
                <article>{totalTasks}</article>
            </div>
            <div>
                <article>Total Sub-Tasks:</article>
                <article>{totalSubtasks}</article>
            </div>
            <div>
                <div>
                    <h2>Task Priorities</h2>
                    <Pie data={getTaskData()}  options={options}/>
                    <h2>Subtask Completion</h2>
                    <Pie data={getSubtaskData()} />
                </div>
            </div>

        </div>
    )
}

export default DashBoardStats