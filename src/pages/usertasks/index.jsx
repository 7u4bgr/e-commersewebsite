import React, { useEffect, useState } from 'react';
import { getUserTasks } from '../../api'; // API fonksiyonunu import et

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const data = await getUserTasks();
      if (data && !data.error) {
        setTasks(data); // Veriyi state'e kaydediyoruz
      } else {
        console.error("Görevler alınamadı.");
      }
    };

    fetchTasks();
  }, []);

  return (
    <div>
      <h1>Görevler</h1>
      {tasks.length === 0 ? (
        <p>Henüz görev eklenmedi.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <h2>{task.title}</h2>
              <p>{task.description}</p>
              <p>Fiyat: {task.price}</p>
              <p>Kategori: {task.category.categoryName}</p>
              <p>Alt Kategori: {task.subCategory.subCategoryName}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
