const Dashboard = () => {
  return (
    <div className="container py-4">

      {/* Header */}
      <div className="mb-4">
        <h4 className="fw-bold mb-0">Dashboard</h4>
        <p className="text-muted small mb-0">
          Welcome back! Here's what's going on.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="row g-3 mb-4">

        <div className="col-lg-4 col-sm-6">
          <div className="card border-0 shadow-sm rounded-4 h-100">
            <div className="card-body d-flex justify-content-between p-4">
              <div>
                <p className="text-muted small mb-1">Total Users</p>
                <h3 className="fw-bold mb-0">120</h3>
              </div>
              <div className="bg-primary-subtle rounded-3 p-3">
                <i className="fas fa-users fs-4 text-primary"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-sm-6">
          <div className="card border-0 shadow-sm rounded-4 h-100">
            <div className="card-body d-flex justify-content-between p-4">
              <div>
                <p className="text-muted small mb-1">Total Projects</p>
                <h3 className="fw-bold mb-0">45</h3>
              </div>
              <div className="bg-info-subtle rounded-3 p-3">
                <i className="fas fa-diagram-project fs-4 text-info"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-sm-6">
          <div className="card border-0 shadow-sm rounded-4 h-100">
            <div className="card-body d-flex justify-content-between p-4">
              <div>
                <p className="text-muted small mb-1">Total Tasks</p>
                <h3 className="fw-bold mb-0">320</h3>
              </div>
              <div className="bg-warning-subtle rounded-3 p-3">
                <i className="fas fa-list-check fs-4 text-warning"></i>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Stats */}
      <div className="row g-3 mb-4">

        {/* Task Stats */}
        <div className="col-lg-6">
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-4">
              <h6 className="fw-bold mb-3">Task Statistics</h6>
              <div className="row g-2">

                <div className="col-6">
                  <div className="bg-warning-subtle p-3 text-center rounded-3">
                    <p className="small mb-1">To Do</p>
                    <h5 className="fw-bold text-warning">25</h5>
                  </div>
                </div>

                <div className="col-6">
                  <div className="bg-info-subtle p-3 text-center rounded-3">
                    <p className="small mb-1">In Progress</p>
                    <h5 className="fw-bold text-info">40</h5>
                  </div>
                </div>

                <div className="col-6">
                  <div className="bg-secondary-subtle p-3 text-center rounded-3">
                    <p className="small mb-1">On Hold</p>
                    <h5 className="fw-bold text-secondary">10</h5>
                  </div>
                </div>

                <div className="col-6">
                  <div className="bg-success-subtle p-3 text-center rounded-3">
                    <p className="small mb-1">Completed</p>
                    <h5 className="fw-bold text-success">120</h5>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Project Stats */}
        <div className="col-lg-6">
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-4">
              <h6 className="fw-bold mb-3">Project Statistics</h6>
              <div className="row g-2">

                <div className="col-6">
                  <div className="bg-warning-subtle p-3 text-center rounded-3">
                    <p className="small mb-1">To Do</p>
                    <h5 className="fw-bold text-warning">12</h5>
                  </div>
                </div>

                <div className="col-6">
                  <div className="bg-info-subtle p-3 text-center rounded-3">
                    <p className="small mb-1">In Progress</p>
                    <h5 className="fw-bold text-info">20</h5>
                  </div>
                </div>

                <div className="col-6">
                  <div className="bg-secondary-subtle p-3 text-center rounded-3">
                    <p className="small mb-1">On Hold</p>
                    <h5 className="fw-bold text-secondary">5</h5>
                  </div>
                </div>

                <div className="col-6">
                  <div className="bg-success-subtle p-3 text-center rounded-3">
                    <p className="small mb-1">Completed</p>
                    <h5 className="fw-bold text-success">30</h5>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Recent */}
      <div className="row g-3">

        {/* Projects */}
        <div className="col-lg-6">
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-4">
              <h6 className="fw-bold mb-3">Recent Projects</h6>

              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                  <span>Website Redesign</span>
                  <span className="badge bg-success-subtle text-success">completed</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>Mobile App</span>
                  <span className="badge bg-info-subtle text-info">in-progress</span>
                </li>
              </ul>

            </div>
          </div>
        </div>

        {/* Tasks */}
        <div className="col-lg-6">
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-4">
              <h6 className="fw-bold mb-3">Recent Tasks</h6>

              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                  <div>
                    <p className="mb-0 fw-semibold">Fix Login Bug</p>
                    <small className="text-muted">Assigned to: John</small>
                  </div>
                  <span className="badge bg-warning-subtle text-warning">pending</span>
                </li>

                <li className="list-group-item d-flex justify-content-between">
                  <div>
                    <p className="mb-0 fw-semibold">Update UI</p>
                    <small className="text-muted">Assigned to: Sarah</small>
                  </div>
                  <span className="badge bg-success-subtle text-success">completed</span>
                </li>
              </ul>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;