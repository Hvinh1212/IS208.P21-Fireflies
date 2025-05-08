const db = require("../config/db");

const Post = {
  getAll: async () => {
    const result = await db`SELECT 
  jobs.id AS job_id,
  jobs.employer_id,
  jobs.branch_id,
  jobs.category_id,
  jobs.title,
  jobs.description,
  jobs.requirements,
  jobs.salary_range,
  jobs.job_type,
  jobs.location,
  jobs.posted_at,
  jobs.deadline,
  jobs.status,
  
  
  employers.company_name,
  employers.industry,
  employers.company_size,
  employers.website,
  employers.avatar,
  employers.name_title,
  employers.email,
  employers.user_id 
FROM jobs
JOIN employers ON jobs.employer_id = employers.id;`;
    return result;
  },

  getById: async (id) => {
    const result = await db`SELECT 
  jobs.id AS job_id,
  jobs.employer_id,
  jobs.branch_id,
  jobs.category_id,
  jobs.title,
  jobs.description,
  jobs.requirements,
  jobs.salary_range,
  jobs.job_type,
  jobs.location,
  jobs.posted_at,
  jobs.deadline,
  jobs.status,
  
  
  employers.company_name,
  employers.industry,
  employers.company_size,
  employers.website,
  employers.avatar,
  employers.name_title,
  employers.email,
  employers.user_id,
  
  job_categories.category_name
  from job_categories JOIN jobs ON jobs.category_id = job_categories.id JOIN employers ON jobs.employer_id = employers.id where jobs.id = ${id}`;
    return result.length ? result[0] : null;
  },

  getByEmployerId: async (employerId) => {
    const result = await db`SELECT 
  jobs.id AS job_id,
  jobs.employer_id,
  jobs.branch_id,
  jobs.category_id,
  jobs.title,
  jobs.description,
  jobs.requirements,
  jobs.salary_range,
  jobs.job_type,
  jobs.location,
  jobs.posted_at,
  jobs.deadline,
  jobs.status,
  
  
  employers.company_name,
  employers.industry,
  employers.company_size,
  employers.website,
  employers.avatar,
  employers.name_title,
  employers.email,
  employers.user_id 
FROM jobs
JOIN employers ON jobs.employer_id = employers.id where jobs.employer_id = ${employerId}`;
    return result.length ? result : null;
  },
};

module.exports = Post;
