
USE Gestion_Academica;
GO

-- =============================================
-- 1. PERIODOS ACADEMICOS
-- =============================================
CREATE TABLE academic_period (
    academic_period_id INT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVO',
    CONSTRAINT CK_period_dates CHECK (end_date >= start_date)
);
GO

-- =============================================
-- 2. GRADOS
-- =============================================
CREATE TABLE grade (
    grade_id INT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    educational_level VARCHAR(20) NOT NULL,
    CONSTRAINT CK_grade_level CHECK (
        educational_level IN ('INICIAL', 'PRIMARIA', 'SECUNDARIA')
    )
);
GO

-- =============================================
-- 3. SECCIONES
-- =============================================
CREATE TABLE section (
    section_id INT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(10) NOT NULL,
    grade_id INT NOT NULL,
    CONSTRAINT FK_section_grade FOREIGN KEY (grade_id)
        REFERENCES grade(grade_id),
    CONSTRAINT UQ_section_grade UNIQUE (name, grade_id)
);
GO

-- =============================================
-- 4. DOCENTES
-- =============================================
CREATE TABLE teacher (
    teacher_id INT IDENTITY(1,1) PRIMARY KEY,
    document_type VARCHAR(10) NOT NULL DEFAULT 'DNI',
    document_number VARCHAR(20) NOT NULL UNIQUE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    specialty VARCHAR(100),
    phone VARCHAR(20),
    email VARCHAR(150) UNIQUE,
    hire_date DATE,
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVO'
);
GO

-- =============================================
-- 5. ESTUDIANTES
-- =============================================
CREATE TABLE student (
    student_id INT IDENTITY(1,1) PRIMARY KEY,
    student_code VARCHAR(20) NOT NULL UNIQUE,
    document_number VARCHAR(20) NOT NULL UNIQUE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    birth_date DATE,
    gender VARCHAR(20),
    address VARCHAR(250),
    photo_url VARCHAR(500),
    grade_id INT NOT NULL,
    section_id INT NOT NULL,
    enrollment_date DATE NOT NULL DEFAULT CAST(GETDATE() AS DATE),
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVO',
    CONSTRAINT FK_student_grade FOREIGN KEY (grade_id)
        REFERENCES grade(grade_id),
    CONSTRAINT FK_student_section FOREIGN KEY (section_id)
        REFERENCES section(section_id)
);
GO

-- =============================================
-- 6. APODERADOS
-- =============================================
CREATE TABLE guardian (
    guardian_id INT IDENTITY(1,1) PRIMARY KEY,
    document_number VARCHAR(20) NOT NULL UNIQUE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(150),
    address VARCHAR(250)
);
GO

CREATE TABLE student_guardian (
    student_id INT NOT NULL,
    guardian_id INT NOT NULL,
    relationship VARCHAR(30) NOT NULL,
    is_primary BIT NOT NULL DEFAULT 0,
    CONSTRAINT PK_student_guardian PRIMARY KEY (student_id, guardian_id),
    CONSTRAINT FK_sg_student FOREIGN KEY (student_id)
        REFERENCES student(student_id),
    CONSTRAINT FK_sg_guardian FOREIGN KEY (guardian_id)
        REFERENCES guardian(guardian_id)
);
GO

-- =============================================
-- 7. CURSOS
-- =============================================
CREATE TABLE course (
    course_id INT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(250),
    educational_level VARCHAR(20) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVO'
);
GO

-- =============================================
-- 8. ASIGNACIONES DOCENTE-CURSO
-- =============================================
CREATE TABLE teacher_assignment (
    assigment_id INT IDENTITY(1,1) PRIMARY KEY,
    teacher_id INT NOT NULL,
    course_id INT NOT NULL,
    grade_id INT NOT NULL,
    section_id INT NOT NULL,
    academic_period_id INT NOT NULL,
    CONSTRAINT FK_ta_teacher FOREIGN KEY (teacher_id)
        REFERENCES teacher(teacher_id),
    CONSTRAINT FK_ta_course FOREIGN KEY (course_id)
        REFERENCES course(course_id),
    CONSTRAINT FK_ta_grade FOREIGN KEY (grade_id)
        REFERENCES grade(grade_id),
    CONSTRAINT FK_ta_section FOREIGN KEY (section_id)
        REFERENCES section(section_id),
    CONSTRAINT FK_ta_period FOREIGN KEY (academic_period_id)
        REFERENCES academic_period(academic_period_id)
);
GO

-- =============================================
-- 9. REGISTRO DE NOTAS
-- =============================================
CREATE TABLE grade_record (
    grade_record_id INT IDENTITY(1,1) PRIMARY KEY,
    student_id INT NOT NULL,
    assigment_id INT NOT NULL,
    academic_period_id INT NOT NULL,
    evaluation_name VARCHAR(100) NOT NULL,
    score DECIMAL(5,2) NOT NULL,
    evaluation_date DATE NOT NULL DEFAULT CAST(GETDATE() AS DATE),
    observations VARCHAR(500),
    CONSTRAINT FK_gr_student FOREIGN KEY (student_id)
        REFERENCES student(student_id),
    CONSTRAINT FK_gr_assignment FOREIGN KEY (assigment_id)
        REFERENCES teacher_assignment(assigment_id),
    CONSTRAINT FK_gr_period FOREIGN KEY (academic_period_id)
        REFERENCES academic_period(academic_period_id),
    CONSTRAINT CK_grade_score CHECK (score >= 0 AND score <= 20)
);
GO

-- =============================================
-- 10. ASISTENCIA DE ESTUDIANTES
-- =============================================
CREATE TABLE attendance (
    attendance_id INT IDENTITY(1,1) PRIMARY KEY,
    student_id INT NOT NULL,
    academic_period_id INT NOT NULL,
    attendance_date DATE NOT NULL,
    status VARCHAR(20) NOT NULL,
    observations VARCHAR(500),
    CONSTRAINT FK_att_student FOREIGN KEY (student_id)
        REFERENCES student(student_id),
    CONSTRAINT FK_att_period FOREIGN KEY (academic_period_id)
        REFERENCES academic_period(academic_period_id),
    CONSTRAINT CK_att_status CHECK (
        status IN ('PRESENTE', 'TARDANZA', 'FALTA', 'JUSTIFICADO')
    ),
    CONSTRAINT UQ_attendance_student_date
        UNIQUE (student_id, attendance_date)
);
GO

-- =============================================
-- 11. ASISTENCIA DE DOCENTES
-- =============================================
CREATE TABLE teacher_attendance (
    teacher_attendance_id INT IDENTITY(1,1) PRIMARY KEY,
    teacher_id INT NOT NULL,
    attendance_date DATE NOT NULL,
    check_in TIME,
    check_out TIME,
    status VARCHAR(20) NOT NULL,
    observations VARCHAR(500),
    CONSTRAINT FK_tatt_teacher FOREIGN KEY (teacher_id)
        REFERENCES teacher(teacher_id),
    CONSTRAINT UQ_teacher_attendance_date
        UNIQUE (teacher_id, attendance_date)
);
GO

-- =============================================
-- 12. USUARIOS Y ROLES
-- =============================================
CREATE TABLE users (
    user_id INT IDENTITY(1,1) PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL,
    teacher_id INT NULL,
    student_id INT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVO',
    created_at DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    CONSTRAINT CK_users_role CHECK (
        role IN ('ADMINISTRADOR', 'PROFESOR', 'ESTUDIANTE')
    ),
    CONSTRAINT FK_users_teacher FOREIGN KEY (teacher_id)
        REFERENCES teacher(teacher_id),
    CONSTRAINT FK_users_student FOREIGN KEY (student_id)
        REFERENCES student(student_id),
    CONSTRAINT CK_users_profile CHECK (
        NOT (teacher_id IS NOT NULL AND student_id IS NOT NULL)
    )
);
GO

-- =============================================
-- 13. VERIFICAR TABLAS CREADAS
-- =============================================
SELECT TABLE_NAME
FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_TYPE = 'BASE TABLE'
ORDER BY TABLE_NAME;
GO
