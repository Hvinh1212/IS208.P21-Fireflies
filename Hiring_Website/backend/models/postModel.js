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
  jobs.is_verify,
  
  
  employers.company_name,
  employers.industry,
  employers.company_size,
  employers.website,
  employers.avatar,
  employers.name_title,
  employers.email,
  employers.user_id,

  users.full_name 
FROM jobs
JOIN employers ON jobs.employer_id = employers.id JOIN users on employers.user_id = users.id where jobs.is_verify = true and jobs.status = 'đang hiển thị';`;
    return result;
  },

  getAllAD: async () => {
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
  jobs.is_verify,
  
  
  employers.company_name,
  employers.industry,
  employers.company_size,
  employers.website,
  employers.avatar,
  employers.name_title,
  employers.email,
  employers.user_id,

  users.full_name 
FROM jobs
JOIN employers ON jobs.employer_id = employers.id JOIN users on employers.user_id = users.id`;
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
  jobs.applicants,
  jobs.is_verify,
  
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

  HideById: async (id) => {
    const result = await db`update jobs set status = 'đang ẩn' where id = ${id}`;
    return result.length ? result[0] : null;
  },

  ShowById: async (id) => {
    const result = await db`update jobs set status = 'đang hiển thị' where id = ${id}`;
    return result.length ? result[0] : null;
  },

  create: async (postData) => {
    const {
      employer_id,
      branch_id,
      category_id,
      title,
      description,
      requirements,
      salary_range,
      job_type,
      location,
      deadline
    } = postData;

    const result = await db`
      INSERT INTO jobs (
        employer_id,
        branch_id,
        category_id,
        title,
        description,
        requirements,
        salary_range,
        job_type,
        location,
        posted_at,
        deadline,
        status,
        applicants
      ) VALUES (
        ${employer_id},
        ${branch_id},
        ${category_id},
        ${title},
        ${description},
        ${requirements},
        ${salary_range},
        ${job_type},
        ${location},
        NOW(),
        ${deadline},
        'đang ẩn',
        0
      )
      RETURNING *
    `;
    return result[0];
  },

  updateVerification: async (id, is_verify) => {
    const result = await db`
        UPDATE jobs 
        SET is_verify = ${is_verify}
        WHERE id = ${id}
        RETURNING *
    `;
    return result[0];
  }
};

module.exports = Post;
