const Employee = {
  create_user: async (client, userData) => {
    const query = `INSERT INTO users (user_id, username, email, password, role, created_at) 
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING user_id;`;
    const values = [
      userData.user_id, 
      userData.username, 
      userData.email, 
      userData.password, 
      userData.role, 
      userData.created_at
    ];

    return await client.query(query, values);
  },

  insert_employee: async (client, empData) => {
    const query = `INSERT INTO employees (
        emp_id, first_name, middle_name, last_name, date_of_birth, gender, 
        phone_number, department_id, position_id, manager_id, 
        joined_date, employment_status, user_id, municipality, city, is_active
      ) 
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)
      RETURNING *;`;
      
    const values = [
      empData.emp_id, empData.first_name, empData.middle_name, empData.last_name,
      empData.date_of_birth, empData.gender, empData.phone_number,
      empData.department_id, empData.position_id, empData.manager_id,
      empData.joined_date, empData.employment_status, empData.user_id,
      empData.municipality, empData.city, empData.is_active
    ];

    const result = await client.query(query, values);
    return result;
  },
};

export default Employee;