import React from "react";
import Sidebar from "../components/common/Sidebar";
import Home from "../pages/Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Footer from "../components/common/Footer";
import Center from "../pages/Center/Center";
import CenterAdd from "../pages/Center/CenterAdd";
import CenterView from "../pages/Center/CenterView";
import CenterEdit from "../pages/Center/CenterEdit";
import Course from "../pages/Course/Course";
import CourseAdd from "../pages/Course/CourseAdd";
import CourseEdit from "../pages/Course/CourseEdit";
import CourseView from "../pages/Course/CourseView";
// import Curriculum from "../pages/Course/curriculum";
import Level from "../pages/Level/Level";
import LevelAdd from "../pages/Level/LevelAdd";
import LevelEdit from "../pages/Level/LevelEdit";
import LevelView from "../pages/Level/LevelView";
import Subject from "../pages/Subject/Subject";
import SubjectAdd from "../pages/Subject/SubjectAdd";
import SubjectEdit from "../pages/Subject/SubjectEdit";
import SubjectView from "../pages/Subject/SubjectView";
import Class from "../pages/Class/Class";
import ClassAdd from "../pages/Class/ClassAdd";
import ClassEdit from "../pages/Class/ClassEdit";
import ClassView from "../pages/Class/ClassView";
import Lead from "../pages/Lead/Lead";
import EnrollmentAdd from "../pages/Lead/Enrollment/EnrollmentAdd";
import EnrollmentEdit from "../pages/Lead/Enrollment/EnrollmentEdit";
import LeadView from "../pages/Lead/LeadView";

import Staff from "../pages/Staff/Staff";
import StaffAdd from "../pages/Staff/StaffAdd";
import StaffEdit from "../pages/Staff/StaffEdit";
import StaffLeave from "../pages/Staff/StaffLeave";
import StaffPayslip from "../pages/Staff/StaffPayslip";
import StaffView from "../pages/Staff/StaffView";
import StaffLeaveView from "../pages/Staff/StaffLeaveView";
import Holiday from "../pages/Staff/Holiday/Holiday";
import HolidayAdd from "../pages/Staff/Holiday/HolidayAdd";
import HolidayEdit from "../pages/Staff/Holiday/HolidayEdit";
import HolidayView from "../pages/Staff/Holiday/HolidayView";
import Deduction from "../pages/Staff/Deductions/Deduction";
import DeductionAdd from "../pages/Staff/Deductions/DeductionAdd";
import DeductionEdit from "../pages/Staff/Deductions/DeductionEdit";
import DeductionView from "../pages/Staff/Deductions/DeductionView";
import LeaveAdmin from "../pages/Staff/Leave Admin/LeaveAdmin";
import Leave from "../pages/Staff/Leave/Leave";
import LeaveAdminEdit from "../pages/Staff/Leave Admin/LeaveAdminEdit";
import LeaveAdminView from "../pages/Staff/Leave Admin/LeaveAdminView";
import LeaveAdd from "../pages/Staff/Leave/LeaveAdd";
import LeaveView from "../pages/Staff/Leave/LeaveView";
import StaffingAttendance from "../pages/StaffingAttendance/StaffingAttendance";
import StaffingAttendanceAdd from "../pages/StaffingAttendance/StaffingAttendanceAdd";
import StaffingAttendanceEdit from "../pages/StaffingAttendance/StaffingAttendanceEdit";
import StaffingAttendanceView from "../pages/StaffingAttendance/StaffingAttendanceView";
import Teacher from "../pages/Teacher/Teacher";
import TeacherAdd from "../pages/Teacher/TeacherAdd";
import TeacherEdit from "../pages/Teacher/TeacherEdit";
import TeacherView from "../pages/Teacher/TeacherView";
import TeacherLeave from "../pages/Teacher/TeacherLeave";
import TeacherPayslip from "../pages/Teacher/TeacherPayslip";
import TeacherLeaveView from "../pages/Teacher/TeacherLeaveView";
import Payslip from "../pages/EmployeePayslip/Payslip";
import ViewPayslip from "../pages/EmployeePayslip/ViewPayslip";
import RolesAdd from "../pages/Roles/RolesAdd";
import Student from "../pages/Student/Student";
import StudentView from "../pages/Student/StudentView";
import StudentDeposit from "../pages/Student/StudentDeposit";
import StudentAdd from "../pages/Student/StudentAdd";
import StudentEdit from "../pages/Student/StudentEdit";
import StudentTransferOut from "../pages/Student/StudentTransferOut";
import StudentChangeClass from "../pages/Student/StudentChangeClass";
import StudentEndClass from "../pages/Student/StudentEndClass";
// import Attendances from "../pages/Attendance/Attendances";
// import AttendancesAdd from "../pages/Attendance/AttendancesAdd";
// import AttendancesEdit from "../pages/Attendance/AttendancesEdit";
// import AttendancesCourse from "../pages/Attendance/AttendancesCourse";
import Document from "../pages/Document/Document";
import DocumentAdd from "../pages/Document/DocumentAdd";
import DocumentEdit from "../pages/Document/DocumentEdit";
import DocumentView from "../pages/Document/DocumentView";
import DocumentFiles from "../pages/Document/DocumentFiles";
import Invoice from "../pages/Invoice/Invoice";
import InvoiceAdd from "../pages/Invoice/InvoiceAdd";
import InvoiceEdit from "../pages/Invoice/InvoiceEdit";
import InvoiceView from "../pages/Invoice/InvoiceView";
import InvoicePayment from "../pages/Invoice/InvoicePayment";
import Payment from "../pages/Payment/Payment";

import Attendances from "../pages/Attendance/Attendances";
import AttendancesAdd from "../pages/Attendance/AttendancesAdd";
import AttendancesEdit from "../pages/Attendance/AttendancesEdit";

import DocumentReport from "../pages/Report/DocumentReport";
import DocumentReportView from "../pages/Report/DocumentReportView";
import Attendance from "../pages/Report/Attendance";
import AssessmentReport from "../pages/Report/AssessmentReport";

import Enrolment from "../pages/Report/Enrolment";
import Fee from "../pages/Report/Fee";
import Package from "../pages/Report/Package";
import Sales from "../pages/Report/Sales";
import StudentReport from "../pages/Report/StudentReport";
import ReplaceClass from "../pages/Report/ReplaceClass";
// import DocumentFiles from "../pages/Document/DocumentFiles";
// import DocumentReportView from "../pages/Report/DocumentReportView";

import SendNotification from "../pages/SendNotification/SendNotification";
import SendNotificationAdd from "../pages/SendNotification/SendNotificationAdd";
import SendNotificationEdit from "../pages/SendNotification/SendNotificationEdit";

import ScheduleTeacherAdd from "../pages/ScheduleTeacher/ScheduleTeacherAdd";
import ScheduleTeacherEdit from "../pages/ScheduleTeacher/ScheduleTeacherEdit";
import ScheduleTeacherView from "../pages/ScheduleTeacher/ScheduleTeacherView";
import ScheduleTeacher from "../pages/ScheduleTeacher/ScheduleTeacher";
import ScheduleTime from "../pages/ScheduleTeacher/ScheduleTime";

function Admin({ handleLogout }) {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary">
        <Sidebar onLogout={handleLogout} />
        <div className="h-screen flex-grow-1 overflow-y-lg-auto">
          <main className="py-6 bg-surface-secondary">
            <Routes>
            <Route path="/" element={<Home />} />

              <Route path="/center" element={<Center />} />
              <Route path="/center/add" element={<CenterAdd />} />
              <Route path="/center/view" element={<CenterView />} />
              <Route path="/center/edit" element={<CenterEdit />} />

              <Route path="/course" element={<Course />} />
              <Route path="/course/add" element={<CourseAdd />} />
              <Route path="/course/edit" element={<CourseEdit />} />
              <Route path="/course/view" element={<CourseView />} />
              {/* <Route path="/course/curriculum/:id" element={<Curriculum />} />
              <Route path="/curriculum" element={<Curriculum />} /> */}

              <Route path="/level" element={<Level />} />
              <Route path="/level/add" element={<LevelAdd />} />
              <Route path="/level/edit" element={<LevelEdit />} />
              <Route path="/level/view" element={<LevelView />} />

              <Route path="/subject" element={<Subject />} />
              <Route path="/subject/add" element={<SubjectAdd />} />
              <Route path="/subject/edit" element={<SubjectEdit />} />
              <Route path="/subject/view" element={<SubjectView />} />

              <Route path="/class" element={<Class />} />
              <Route path="/class/add" element={<ClassAdd />} />
              <Route path="/class/edit" element={<ClassEdit />} />
              <Route path="/class/view" element={<ClassView />} />

              <Route path="/lead/lead" element={<Lead />} />
              <Route path="/lead/lead/add" element={<EnrollmentAdd />} />
              <Route path="/lead/lead/edit" element={<EnrollmentEdit />} />
              <Route path="/lead/lead/view" element={<LeadView />} />
              <Route path="/lead/enrollment" element={<EnrollmentAdd />} />

              {/* StaffingAttendance */}
              <Route path="/staffing/attendance" element={<StaffingAttendance />} />
              <Route path="/staffing/attendance/add" element={<StaffingAttendanceAdd />} />
              <Route path="/staffing/attendance/edit/:id" element={<StaffingAttendanceEdit />} />
              <Route path="/staffing/attendance/view/:id" element={<StaffingAttendanceView />} />

              {/* {/ {/ Holiday /} /} */}
              <Route path="/holiday" element={<Holiday />} />
              <Route path="/holiday/add" element={<HolidayAdd />} />
              <Route path="/holiday/edit" element={<HolidayEdit />} />
              <Route path="/holiday/list" element={<HolidayView />} />

              {/* {/ {/ Deduction /} /} */}
              <Route path="/deduction" element={<Deduction />} />
              <Route path="/deduction/add" element={<DeductionAdd />} />
              <Route path="/deduction/edit" element={<DeductionEdit />} />
              <Route path="/deduction/list" element={<DeductionView />} />

              {/* {/ Leave Admin /} */}
              <Route path="/leaveadmin" element={<LeaveAdmin />} />
              <Route path="/leaveadmin/edit" element={<LeaveAdminEdit />} />
              <Route path="/leaveadmin/view" element={<LeaveAdminView />} />

              {/* {/ Leave /} */}
              <Route path="/leave" element={<Leave />} />
              <Route path="/leave/add" element={<LeaveAdd />} />
              <Route path="/leave/view" element={<LeaveView />} />

              <Route path="/staff" element={<Staff />} />
              <Route path="/staff/add" element={<StaffAdd />} />
              <Route path="/staff/edit" element={<StaffEdit />} />
              <Route path="/staff/view" element={<StaffView />} />
              <Route path="/staff/leave" element={<StaffLeave />} />
              <Route path="/staff/leave/view" element={<StaffLeaveView />} />
              <Route path="/staff/payslip" element={<StaffPayslip />} />
              
              <Route path="/teacher" element={<Teacher />} />
              <Route path="/teacher/add" element={<TeacherAdd />} />
              <Route path="/teacher/edit" element={<TeacherEdit />} />
              <Route path="/teacher/view" element={<TeacherView />} />
              <Route path="/teacher/leave" element={<TeacherLeave />} />
              <Route
                path="/teacher/leave/view"
                element={<TeacherLeaveView />}
              />
              <Route path="/teacher/payslip" element={<TeacherPayslip />} />

              <Route path="/employeepayslip" element={<Payslip />} />
              <Route path="/employeepayslip/view" element={<ViewPayslip />} />

              <Route path="/role/add" element={<RolesAdd />} />

              <Route path="/student" element={<Student />} />
              <Route path="/student/add" element={<StudentAdd />} />
              <Route path="/student/edit" element={<StudentEdit />} />
              <Route path="/student/view" element={<StudentView />} />
              <Route
                path="/student/view/transferOut/:id"
                element={<StudentTransferOut />}
              />
              <Route
                path="/student/view/changeClass"
                element={<StudentChangeClass />}
              />
              <Route
                path="/student/view/endClass/:id"
                element={<StudentEndClass />}
              />
              <Route
                path="/student/view/deposit"
                element={<StudentDeposit />}
              />
              {/* <Route path="/student/withdraw" element={<WithdrawAdd />} />
              <Route
                path="/student/register/course/:id"
                element={<StudentRegisterCourse />}
              /> */}

              {/* <Route path="/attendance/list" element={<AttendancesCourse />} /> */}
              <Route path="/attendance" element={<Attendances />} />
              <Route path="/attendance/add" element={<AttendancesAdd />} />
              <Route path="/attendance/edit" element={<AttendancesEdit />} />
              <Route path="/document" element={<Document />} />
              <Route path="/document/add" element={<DocumentAdd />} />
              <Route path="/document/edit" element={<DocumentEdit />} />
              <Route path="/document/view/:id" element={<DocumentView />} />
              <Route path="/documentfile" element={<DocumentFiles />} />

              <Route path="/invoice" element={<Invoice />} />
              <Route path="/invoice/add" element={<InvoiceAdd />} />
              <Route path="/invoice/edit/:id" element={<InvoiceEdit />} />
              <Route path="/invoice/view/:id" element={<InvoiceView />} />

              <Route path="/invoice/invoicepayment" element={<InvoicePayment />} />
              <Route path="/payment" element={<Payment />} />

              <Route path="/report/attendance" element={<Attendance />} />
              <Route path="/report/enrolment" element={<Enrolment/>} />
              <Route path="/report/fee" element={<Fee />} />
              <Route path="/report/package" element={<Package />} />
              <Route path="/report/sales" element={<Sales />} />
              {/* <Route path="/report/studentreport" element={<StudentReport />} /> */}
              <Route path="/report/document" element={<DocumentReport />} />
              <Route path="/report/replace_class" element={<ReplaceClass />} />
              <Route
                path="/report/document/view"
                element={<DocumentReportView />}
              />
              <Route path="/report/assessment" element={<AssessmentReport/>} />

              <Route path="/sendNotification" element={<SendNotification />} />
              <Route path="/sendNotification/add" element={<SendNotificationAdd />} />
              <Route path="/sendNotification/edit" element={<SendNotificationEdit />} />

              <Route path="/scheduleteacher" element={<ScheduleTeacher />} />
              <Route
                path="/scheduleteacher/add"
                element={<ScheduleTeacherAdd />}
              />
              <Route
                path="/scheduleteacher/edit/:id"
                element={<ScheduleTeacherEdit />}
              />
              <Route
                path="/scheduleteacher/view/:id"
                element={<ScheduleTeacherView />}
              />
              <Route
                path="/scheduleteacher/scheduletime/:id"
                element={<ScheduleTime />}
              />

            </Routes>

            <Footer />
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default Admin;
