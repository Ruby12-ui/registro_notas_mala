USE Gestion_Academica;
GO

-- =============================================
-- DATOS INICIALES - Sistema de Gestión Académica
-- =============================================

-- Limpiar en orden inverso a las FK
DELETE FROM grade_record;
DELETE FROM attendance;
DELETE FROM teacher_assignment;
DELETE FROM student;
DELETE FROM guardian;
DELETE FROM section;
DELETE FROM teacher;
DELETE FROM course;
DELETE FROM grade;
DELETE FROM academic_period;
GO

-- =============================================
-- 1. PERIODOS ACADÉMICOS
-- =============================================
INSERT INTO academic_period (name, start_date, end_date, status) VALUES
('Año Académico 2026', '2026-03-02', '2026-12-18', 'ACTIVO'),
('Año Académico 2025', '2025-03-03', '2025-12-19', 'FINALIZADO');
GO

-- =============================================
-- 2. GRADOS
-- =============================================
INSERT INTO grade (name, educational_level) VALUES
('1er Grado',    'PRIMARIA'),
('2do Grado',    'PRIMARIA'),
('3er Grado',    'PRIMARIA'),
('4to Grado',    'PRIMARIA'),
('5to Grado',    'PRIMARIA'),
('6to Grado',    'PRIMARIA'),
('1ro Secundaria','SECUNDARIA'),
('2do Secundaria','SECUNDARIA'),
('3ro Secundaria','SECUNDARIA'),
('4to Secundaria','SECUNDARIA'),
('5to Secundaria','SECUNDARIA');
GO

-- =============================================
-- 3. SECCIONES
-- =============================================
-- Primaria: grados 1-6 (IDs 1-6), secciones A y B
INSERT INTO section (name, grade_id) VALUES
('A', 1), ('B', 1),
('A', 2), ('B', 2),
('A', 3), ('B', 3),
('A', 4), ('B', 4),
('A', 5), ('B', 5),
('A', 6), ('B', 6),
-- Secundaria: grados 7-11 (IDs 7-11), secciones A y B
('A', 7),  ('B', 7),
('A', 8),  ('B', 8),
('A', 9),  ('B', 9),
('A', 10), ('B', 10),
('A', 11), ('B', 11);
GO

-- =============================================
-- 4. CURSOS
-- =============================================
INSERT INTO course (name, description, educational_level, status) VALUES
('Matemática',           'Álgebra, aritmética y geometría',       'SECUNDARIA', 'ACTIVO'),
('Comunicación',         'Lenguaje, literatura y redacción',       'SECUNDARIA', 'ACTIVO'),
('Ciencia y Tecnología', 'Física, química y biología',             'SECUNDARIA', 'ACTIVO'),
('Historia',             'Historia del Perú y del mundo',          'SECUNDARIA', 'ACTIVO'),
('Inglés',               'Idioma inglés nivel básico-intermedio',  'SECUNDARIA', 'ACTIVO'),
('Arte y Cultura',       'Expresión artística y cultural',         'SECUNDARIA', 'ACTIVO'),
('Matemática',           'Operaciones básicas y problemas',        'PRIMARIA',   'ACTIVO'),
('Comunicación',         'Lectura y escritura',                    'PRIMARIA',   'ACTIVO');
GO

-- =============================================
-- 5. DOCENTES
-- =============================================
INSERT INTO teacher (document_type, document_number, first_name, last_name, specialty, phone, email, hire_date, status) VALUES
('DNI', '45678912', 'Carlos',   'Mendoza López', 'Matemática',           '987651234', 'cmendoza@colegio.edu.pe',   '2020-03-01', 'ACTIVO'),
('DNI', '47891236', 'Ana',      'Torres García', 'Comunicación',         '987652345', 'atorres@colegio.edu.pe',    '2019-03-01', 'ACTIVO'),
('DNI', '41236789', 'Luis',     'Ramírez Pérez', 'Ciencia y Tecnología', '987653456', 'lramirez@colegio.edu.pe',   '2021-03-01', 'ACTIVO'),
('DNI', '43219876', 'María',    'López Sánchez', 'Historia',             '987654567', 'mlopez@colegio.edu.pe',     '2018-03-01', 'ACTIVO'),
('DNI', '49871234', 'Pedro',    'Torres Vega',   'Inglés',               '987655678', 'ptorres@colegio.edu.pe',    '2022-03-01', 'ACTIVO');
GO

-- =============================================
-- 6. ESTUDIANTES  (grade_id=11 → 5to Secundaria, section_id=21 → 5to-A)
-- =============================================
INSERT INTO student (student_code, document_number, first_name, last_name, birth_date, gender, grade_id, section_id, enrollment_date, status) VALUES
('EST-2026-001', '74561234', 'Juan',    'Pérez García',    '2010-05-12', 'Masculino', 11, 21, '2026-03-02', 'ACTIVO'),
('EST-2026-002', '72345678', 'María',   'López Torres',    '2010-08-20', 'Femenino',  11, 21, '2026-03-02', 'ACTIVO'),
('EST-2026-003', '75678912', 'Carlos',  'Ramírez Díaz',    '2011-02-15', 'Masculino', 10, 19, '2026-03-02', 'ACTIVO'),
('EST-2026-004', '71234567', 'Lucía',   'Flores Mendoza',  '2010-11-30', 'Femenino',  11, 21, '2026-03-02', 'ACTIVO'),
('EST-2026-005', '73456789', 'Diego',   'Mendoza Castro',  '2011-04-25', 'Masculino', 11, 21, '2026-03-02', 'ACTIVO'),
('EST-2026-006', '76543210', 'Sofía',   'Vargas Quispe',   '2010-09-08', 'Femenino',  11, 21, '2026-03-02', 'ACTIVO'),
('EST-2026-007', '78901234', 'Andrés',  'Chávez Ruiz',     '2011-01-17', 'Masculino', 10, 19, '2026-03-02', 'ACTIVO'),
('EST-2026-008', '70192837', 'Valentina','Ríos Paredes',   '2010-07-03', 'Femenino',  11, 21, '2026-03-02', 'ACTIVO');
GO

-- =============================================
-- 7. ASIGNACIONES DOCENTE-CURSO
-- (teacher_id, course_id, grade_id, section_id, academic_period_id)
-- =============================================
INSERT INTO teacher_assignment (teacher_id, course_id, grade_id, section_id, academic_period_id) VALUES
(1, 1, 11, 21, 1),   -- Carlos Mendoza → Matemática, 5to-A, 2026
(2, 2, 11, 21, 1),   -- Ana Torres     → Comunicación, 5to-A, 2026
(3, 3, 11, 21, 1),   -- Luis Ramírez   → Ciencia y Tec., 5to-A, 2026
(4, 4, 11, 21, 1),   -- María López    → Historia, 5to-A, 2026
(5, 5, 11, 21, 1),   -- Pedro Torres   → Inglés, 5to-A, 2026
(1, 1, 10, 19, 1),   -- Carlos Mendoza → Matemática, 4to-A, 2026
(2, 2, 10, 19, 1);   -- Ana Torres     → Comunicación, 4to-A, 2026
GO

-- =============================================
-- 8. NOTAS (asignacion_id 1=Mat5to, 2=Com5to, etc.)
-- =============================================
INSERT INTO grade_record (student_id, assigment_id, academic_period_id, evaluation_name, score, evaluation_date) VALUES
-- Matemática 5to-A, Bimestre I
(1, 1, 1, 'Bimestre I', 16.00, '2026-05-15'),
(2, 1, 1, 'Bimestre I', 18.00, '2026-05-15'),
(4, 1, 1, 'Bimestre I', 15.00, '2026-05-15'),
(5, 1, 1, 'Bimestre I', 14.00, '2026-05-15'),
(6, 1, 1, 'Bimestre I', 17.00, '2026-05-15'),
(8, 1, 1, 'Bimestre I', 13.00, '2026-05-15'),
-- Comunicación 5to-A, Bimestre I
(1, 2, 1, 'Bimestre I', 17.00, '2026-05-15'),
(2, 2, 1, 'Bimestre I', 19.00, '2026-05-15'),
(4, 2, 1, 'Bimestre I', 16.00, '2026-05-15'),
(5, 2, 1, 'Bimestre I', 15.00, '2026-05-15'),
-- Ciencia y Tecnología 5to-A, Bimestre I
(1, 3, 1, 'Bimestre I', 14.00, '2026-05-16'),
(2, 3, 1, 'Bimestre I', 16.00, '2026-05-16');
GO

-- =============================================
-- 9. ASISTENCIA
-- =============================================
INSERT INTO attendance (student_id, academic_period_id, attendance_date, status) VALUES
(1, 1, '2026-09-02', 'PRESENTE'),
(2, 1, '2026-09-02', 'PRESENTE'),
(4, 1, '2026-09-02', 'TARDANZA'),
(5, 1, '2026-09-02', 'FALTA'),
(6, 1, '2026-09-02', 'PRESENTE'),
(8, 1, '2026-09-02', 'PRESENTE'),
(1, 1, '2026-09-03', 'PRESENTE'),
(2, 1, '2026-09-03', 'FALTA'),
(4, 1, '2026-09-03', 'PRESENTE'),
(5, 1, '2026-09-03', 'PRESENTE');
GO

SELECT 'Datos insertados correctamente' AS resultado;
GO
