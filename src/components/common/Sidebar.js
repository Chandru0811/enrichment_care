import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Collapse, Nav } from "react-bootstrap";
import Logo from "../../assets/Logo.png";
import "../../styles/sidebar.css";

function Sidebar({ onLogout }) {
  const handelLogOutClick = () => {
    onLogout();
  };
  const [activeMenu, setActiveMenu] = useState(null);
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    // const storedScreens = JSON.parse(sessionStorage.getItem("screens") || "{}");
    const storedScreens = {
      centerListingIndex: true,
      levelIndex: true,
      subjectIndex: true,
      courseIndex: true,
      classIndex: true,
      leadListingIndex: true,
      enrollmentIndex: true,
      staffIndex: true,
      teacherIndex: true,
      staffAttendanceIndex: false,
      leaveAdminIndex: true,
      leaveIndex: true,
      holidayIndex: true,
      deductionIndex: true,
      payrollIndex: false,
      payslipIndex: true,
      rolesMatrixIndex: true,
      studentListingIndex: true,
      attendanceIndex: true,
      scheduleTeacherIndex: true,
      documentListingIndex: true,
      documentFileIndex: true,
      invoiceIndex: true,
      paymentIndex: true,
      documentReportIndex: true,
      attendanceReportIndex: true,
      studentReportIndex: false,
      assessmentReportIndex: true,
      enrollmentReportIndex: true,
      feeCollectionReportIndex: true,
      packageBalanceReportIndex: true,
      salesRevenueReportindex: true,
      replaceClassLessonListindex: false
    };
    const updatedMenuItems = [
      {
        title: "Centre Management",
        icon: "bx bx-building",
        isOpen: false,
        subMenus: [
          {
            title: "Centre Listing",
            path: "/center",
            access: storedScreens.centerListingIndex,
          },
        ],
      },
      {
        title: "Course Management",
        icon: "bx bx-book-alt",
        isOpen: false,
        subMenus: [
          { title: "Level", path: "/level", access: storedScreens.levelIndex },
          {
            title: "Subject",
            path: "/subject",
            access: storedScreens.subjectIndex,
          },
          {
            title: "Course",
            path: "/course",
            access: storedScreens.courseIndex,
          },
          { title: "Class", path: "/class", access: storedScreens.classIndex },
        ],
      },
      {
        title: "Lead Management",
        icon: "bx bx-pie-chart-alt-2",
        isOpen: false,
        subMenus: [
          {
            title: "Lead Listing",
            path: "lead/lead",
            access: storedScreens.leadListingIndex,
          },
          // {
          //   title: "Enrollment",
          //   path: "/lead/enrollment",
          //   access: storedScreens.enrollmentIndex,
          // },
        ],
      },
      {
        title: "Staffing",
        icon: "bx bx-female",
        isOpen: false,
        subMenus: [
          {
            title: "Staff",
            path: "/staff",
            access: storedScreens.staffIndex,
          },
          {
            title: "Teacher",
            path: "/teacher",
            access: storedScreens.teacherIndex,
          },
          {
            title: "Attendance",
            path: "/staffing/attendance",
            access: storedScreens.staffAttendanceIndex,
          },
          {
            title: "Leave",
            path: "/leaveadmin",
            access: storedScreens.leaveAdminIndex,
          },
          {
            title: "Leave Request",
            path: "/leave",
            access: storedScreens.leaveIndex,
          },
          {
            title: "Holiday",
            path: "/holiday",
            access: storedScreens.holidayIndex,
          },
          {
            title: "Deduction",
            path: "/deduction",
            access: storedScreens.deductionIndex,
          },
          {
            title: "Payroll",
            path: "/payrolladmin",
            access: storedScreens.payrollIndex,
          },
          {
            title: "Payslip",
            path: "/employeepayslip",
            access: storedScreens.payslipIndex,
          },
          {
            title: "Role & Matrix",
            path: "/role/add",
            access: storedScreens.rolesMatrixIndex,
          },
        ],
      },
      {
        title: "Student Management",
        icon: "bx bx-book-reader",
        isOpen: false,
        subMenus: [
          {
            title: "Student Listing",
            path: "/student",
            access: storedScreens.studentListingIndex,
          },
          {
            title: "Attendance",
            path: "/attendance",
            access: storedScreens.attendanceIndex,
          },
        ],
      },
      {
        title: "Schedule",
        icon: "bx bx-alarm-add",
        isOpen: false,
        subMenus: [
          {
            title: "Time Schedule",
            path: "/scheduleteacher",
            access: storedScreens.scheduleTeacherIndex,
          },
          // { title: "Make Up Class", path: "/reschedule" },
          // Add more submenus as needed
        ],
      },
      {
        title: "Document Management",
        icon: "bx bx-folder-open",
        isOpen: false,
        subMenus: [
          {
            title: "Document Folder",
            path: "/document",
            access: storedScreens.documentListingIndex,
          },
          {
            title: "Document Files",
            path: "/documentfile",
            access: storedScreens.documentFileIndex,
          },
          // Add more submenus as needed
        ],
      },
      {
        title: "Invoice and Payment",
        icon: "bx bx-spreadsheet",
        isOpen: false,
        subMenus: [
          {
            title: "Invoice",
            path: "/invoice",
            access: storedScreens.invoiceIndex,
          },
          {
            title: "Payment",
            path: "/payment",
            access: storedScreens.paymentIndex,
          },
          // Add more submenus as needed
        ],
      },

      {
        title: "Report Management",
        icon: "bx bx-food-menu",
        isOpen: false,
        subMenus: [
          {
            title: "Document Report",
            path: "/report/document",
            access: storedScreens.documentReportIndex,
          },
          {
            title: "Attendance Report",
            path: "/report/attendance",
            access: storedScreens.attendanceReportIndex,
          },
          {
            title: "Student Report",
            path: "/report/studentreport",
            access: storedScreens.studentReportIndex,
          },
          {
            title: "Assessment Report",
            path: "/report/assessment",
            access: storedScreens.assessmentReportIndex,
          },
          {
            title: "Enrolment Report",
            path: "/report/enrolment",
            access: storedScreens.enrollmentReportIndex,
          },
          {
            title: "Fee Collection Report",
            path: "/report/fee",
            access: storedScreens.feeCollectionReportIndex,
          },
          {
            title: "Package Balance Report",
            path: "/report/package",
            access: storedScreens.packageBalanceReportIndex,
          },
          {
            title: "Sales Revenue Report",
            path: "/report/sales",
            access: storedScreens.salesRevenueReportindex,
          },
          {
            title: "Replace Class Lesson List",
            path: "/report/replace_class",
            access: storedScreens.replaceClassLessonListindex,
          },
        ],
      },
    ]

    setMenuItems(updatedMenuItems);
  }, []);

  const [leadMenuOpen] = useState(false);
  // const [reportMenuOpen, setReportMenuOpen] = useState(false);
  // const [studentMenuOpen, setStudentMenuOpen] = useState(false);
  // const [referMenuOpen, setReferMenuOpen] = useState(false);
  const [activeSubmenu] = useState(null);

  const handleMenuClick = (index) => {
    if (index === null) {
      // If Home is clicked, deactivate all menus
      setMenuItems(menuItems.map((item) => ({ ...item, isOpen: false })));
      setActiveMenu(null);
    } else {
      const updatedMenuItems = menuItems.map((item, i) => {
        if (i === index) {
          return {
            ...item,
            isOpen: !item.isOpen,
          };
        } else {
          return {
            ...item,
            isOpen: false,
          };
        }
      });
      setMenuItems(updatedMenuItems);
      setActiveMenu(
        updatedMenuItems[index].isOpen ? updatedMenuItems[index].title : null
      );
    }
  };
  return (
    <nav
      className="navbar show navbar-vertical h-lg-screen navbar-expand-lg p-0 navbar-light border-bottom border-bottom-lg-0 border-end-lg"
      style={{ backgroundColor: "#1A516B" }}
      id="navbarVertical"
    >
      <div className="container-fluid sidebar">
        <button
          className="navbar-toggler mx-2 p-1"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#sidebarCollapse"
          aria-controls="sidebarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <NavLink
          style={{ background: "#1A516B" }}
          className={`navbar-brand  logo_ats py-lg-2 px-lg-6 m-0 d-flex align-items-center justify-content-center header-logo ${leadMenuOpen || activeSubmenu ? "active" : ""
            }`}
          to="/"
        >
          <img
            src={Logo}
            alt="logo"
            style={{ width: "50px", height: "50px" }}
          />
          <span
            className="text-white fs-4 fw-bolder ms-2 me-1"
            style={{ textShadow: "1px 1px 2px black" }}
          >
            Enrichement Care
          </span>
        </NavLink>
        <div className="collapse navbar-collapse" id="sidebarCollapse">
          <ul className="nav-links" style={{ listStyle: "none", paddingLeft: 0 }}>
            <NavLink to="/" onClick={() => handleMenuClick(null)} >
              <li className="py-2 px-4 nav-link" >
                <i className="bx bx-grid-alt text-light" ></i>
                <span className="links_name links_names ps-2">Home</span>
              </li>
            </NavLink>

            {menuItems.map(
              (item, index) =>
                item.subMenus.some((subMenu) => subMenu.access) && (
                  <li key={index}>
                    <Nav.Link
                      to="#"
                      onClick={() => handleMenuClick(index)}
                      className={activeMenu === item.title ? "active" : ""}
                    >
                      <div
                        className="w-100 d-flex justify-content-between"
                        style={{ overflow: "hidden", whiteSpace: "nowrap" }}
                      >
                        <span>
                          <i className={item.icon}></i>
                          <span className="links_name">{item.title}</span>
                        </span>
                        <span>
                          <i
                            className={`bx bx-chevron-down arrow ${item.isOpen ? "open" : "closed"
                              }`}
                            style={{
                              paddingRight: "5px",
                              minWidth: "0px",
                              fontWeight: "700",
                            }}
                          ></i>
                        </span>
                      </div>
                    </Nav.Link>

                    <Collapse in={item.isOpen}>
                      <ul className="submenu" >
                        {item.subMenus.map(
                          (subMenu, subIndex) =>
                            subMenu.access && (
                              <li key={subIndex}>
                                <NavLink
                                  to={subMenu.path}
                                  className="links_name ps-8"
                                  activeClassName="active-submenu"
                                >
                                  <i className="bx bx-radio-circle-marked"></i>
                                  <span className="links_name links_names">
                                    {subMenu.title}
                                  </span>
                                </NavLink>
                              </li>
                            )
                        )}
                      </ul>
                    </Collapse>
                  </li>
                )
            )}

            <NavLink to="/sendNotification" className="links_name" onClick={() => handleMenuClick(null)}>
              <li className="py-2 px-4 nav-link">
                <i class="bx bx-send text-light"></i>
                <span className="links_name links_names ps-2">Send Notification</span>
              </li>
            </NavLink>
          </ul>

      <div style={{marginTop:"30%"}}>
      <div className="my-5 border-top-1" style={{ border: '1px solid #87878761' }} />

      </div>

          <div className="mt-auto logutBtn">
            <li className="py-2 px-4 nav-link" style={{cursor:"pointer"}}>
              <i className="bi bi-person-square"></i>
              <span className="links_name links_names ps-2">Account</span>
            </li>
            <li className="py-2 px-4 nav-link" style={{cursor:"pointer"}} onClick={handelLogOutClick}>
              <i className="bi bi-box-arrow-left"></i>
              <span className="links_name links_names ps-2">Logout</span>
            </li>

            {/* <button className="nav-link ps-6" to={"#"}>
                <i className="bi bi-person-square"></i> Account
              </button>
            </div>
            <button
              to={"#"}
              className="nav-lin ps-6"
              onClick={handelLogOutClick}
            >
              <i className="bi bi-box-arrow-left"></i> Logout
            </button> */}
          </div>
          {/* <ul className="navbar-nav">
            <li className="nav-item text-start">
              <button className="nav-link" to={"#"}>
                <i className="bi bi-person-square"></i> Account
              </button>
            </li>
            <li className="nav-item">
              <button to={"#"} className="nav-link" onClick={handelLogOutClick}>
                <i className="bi bi-box-arrow-left"></i> Logout
              </button>
            </li>
          </ul> */}
        </div>
      </div>
    </nav>
  );
}

export default Sidebar;
