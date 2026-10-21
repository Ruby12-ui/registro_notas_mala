USE Gestion_Academica;
GO

-- =============================================
-- 1. PERIODOS ACADEMICOS
-- =============================================
INSERT INTO academic_period (name, start_date, end_date, status)
VALUES
('2026 - I BIMESTRE', '2026-03-09', '2026-05-08', 'ACTIVO'),
('2026 - II BIMESTRE', '2026-05-11', '2026-07-24', 'ACTIVO'),
('2026 - III BIMESTRE', '2026-08-10', '2026-10-09', 'ACTIVO'),
('2026 - IV BIMESTRE', '2026-10-19', '2026-12-18', 'ACTIVO');
GO

-- =============================================
-- 2. GRADOS
-- =============================================
INSERT INTO grade (name, educational_level)
VALUES
('3 años', 'INICIAL'),
('4 años', 'INICIAL'),
('5 años', 'INICIAL'),
('1° Primaria', 'PRIMARIA'),
('2° Primaria', 'PRIMARIA'),
('3° Primaria', 'PRIMARIA'),
('4° Primaria', 'PRIMARIA'),
('5° Primaria', 'PRIMARIA'),
('6° Primaria', 'PRIMARIA'),
('1° Secundaria', 'SECUNDARIA'),
('2° Secundaria', 'SECUNDARIA'),
('3° Secundaria', 'SECUNDARIA'),
('4° Secundaria', 'SECUNDARIA'),
('5° Secundaria', 'SECUNDARIA');
GO

-- =============================================
-- 3. SECCIONES
-- =============================================
INSERT INTO section (name, grade_id)
SELECT 'A', grade_id FROM grade;

INSERT INTO section (name, grade_id)
SELECT 'B', grade_id FROM grade;

GO

-- =============================================
-- 4. DOCENTES
-- =============================================
INSERT INTO teacher
(document_type, document_number, first_name, last_name,
 specialty, phone, email, hire_date, status)
VALUES
('DNI', '45678901', 'Carlos', 'Ramirez Torres',
 'Matemática', '987654321', 'carlos.ramirez@colegio.edu.pe', '2022-03-01', 'ACTIVO'),
('DNI', '45678902', 'Maria', 'Lopez Garcia',
 'Comunicación', '987654322', 'maria.lopez@colegio.edu.pe', '2021-03-01', 'ACTIVO'),
('DNI', '45678903', 'Jose', 'Fernandez Ruiz',
 'Ciencia y Tecnología', '987654323', 'jose.fernandez@colegio.edu.pe', '2023-03-01', 'ACTIVO'),
('DNI', '45678904', 'Ana', 'Castillo Perez',
 'Ciencias Sociales', '987654324', 'ana.castillo@colegio.edu.pe', '2020-03-01', 'ACTIVO'),
('DNI', '45678905', 'Luis', 'Mendoza Silva',
 'Inglés', '987654325', 'luis.mendoza@colegio.edu.pe', '2024-03-01', 'ACTIVO');
GO

-- =============================================
-- 5. ESTUDIANTES
-- Se utiliza 1° de Secundaria, seccion A
-- =============================================
INSERT INTO student
(student_code, document_number, first_name, last_name,
 birth_date, gender, address, photo_url, grade_id,
 section_id, enrollment_date, status)
VALUES
('EST0001', '76543201', 'Pedro', 'Sanchez Flores',
 '2013-04-15', 'MASCULINO', 'Mala, Cañete', NULL,
 (SELECT grade_id FROM grade WHERE name = '1° Secundaria'),
 (SELECT section_id FROM section
  WHERE name = 'A' AND grade_id =
  (SELECT grade_id FROM grade WHERE name = '1° Secundaria')),
 '2026-03-09', 'ACTIVO'),

('EST0002', '76543202', 'Lucia', 'Torres Vega',
 '2013-07-20', 'FEMENINO', 'Mala, Cañete', NULL,
 (SELECT grade_id FROM grade WHERE name = '1° Secundaria'),
 (SELECT section_id FROM section
  WHERE name = 'A' AND grade_id =
  (SELECT grade_id FROM grade WHERE name = '1° Secundaria')),
 '2026-03-09', 'ACTIVO'),

('EST0003', '76543203', 'Miguel', 'Rojas Castro',
 '2013-02-10', 'MASCULINO', 'San Antonio, Cañete', NULL,
 (SELECT grade_id FROM grade WHERE name = '1° Secundaria'),
 (SELECT section_id FROM section
  WHERE name = 'A' AND grade_id =
  (SELECT grade_id FROM grade WHERE name = '1° Secundaria')),
 '2026-03-09', 'ACTIVO'),

('EST0004', '76543204', 'Camila', 'Diaz Ramos',
 '2013-09-12', 'FEMENINO', 'Mala, Cañete', NULL,
 (SELECT grade_id FROM grade WHERE name = '1° Secundaria'),
 (SELECT section_id FROM section
  WHERE name = 'A' AND grade_id =
  (SELECT grade_id FROM grade WHERE name = '1° Secundaria')),
 '2026-03-09', 'ACTIVO'),

('EST0005', '76543205', 'Andres', 'Vargas Leon',
 '2013-11-05', 'MASCULINO', 'Mala, Cañete', NULL,
 (SELECT grade_id FROM grade WHERE name = '1° Secundaria'),
 (SELECT section_id FROM section
  WHERE name = 'A' AND grade_id =
  (SELECT grade_id FROM grade WHERE name = '1° Secundaria')),
 '2026-03-09', 'ACTIVO');
GO

-- =============================================
-- 6. APODERADOS
-- =============================================
INSERT INTO guardian
(document_number, first_name, last_name, phone, email, address)
VALUES
('61234501', 'Rosa', 'Flores Diaz', '976111001',
 'rosa.flores@email.com', 'Mala, Cañete'),
('61234502', 'Jorge', 'Vega Soto', '976111002',
 'jorge.vega@email.com', 'Mala, Cañete'),
('61234503', 'Elena', 'Castro Ruiz', '976111003',
 'elena.castro@email.com', 'San Antonio, Cañete'),
('61234504', 'Pedro', 'Ramos Silva', '976111004',
 'pedro.ramos@email.com', 'Mala, Cañete'),
('61234505', 'Carmen', 'Leon Torres', '976111005',
 'carmen.leon@email.com', 'Mala, Cañete');
GO

-- =============================================
-- 7. RELACION ESTUDIANTE - APODERADO
-- =============================================
INSERT INTO student_guardian
(student_id, guardian_id, relationship, is_primary)
VALUES
(1, 1, 'MADRE', 1),
(2, 2, 'PADRE', 1),
(3, 3, 'MADRE', 1),
(4, 4, 'PADRE', 1),
(5, 5, 'MADRE', 1);
GO

-- =============================================
-- 8. CURSOS
-- =============================================
INSERT INTO course (name, description, educational_level, status)
VALUES
('Matemática', 'Resolución de problemas matemáticos', 'SECUNDARIA', 'ACTIVO'),
('Comunicación', 'Comprensión y producción de textos', 'SECUNDARIA', 'ACTIVO'),
('Ciencia y Tecnología', 'Investigación científica', 'SECUNDARIA', 'ACTIVO'),
('Ciencias Sociales', 'Historia y sociedad', 'SECUNDARIA', 'ACTIVO'),
('Inglés', 'Idioma extranjero', 'SECUNDARIA', 'ACTIVO'),
('Educación Física', 'Actividad física y salud', 'SECUNDARIA', 'ACTIVO'),
('Arte y Cultura', 'Expresión artística', 'SECUNDARIA', 'ACTIVO'),
('Desarrollo Personal', 'Desarrollo personal y ciudadanía', 'SECUNDARIA', 'ACTIVO');
GO

-- =============================================
-- 9. ASIGNACIONES DOCENTE - CURSO
-- =============================================
INSERT INTO teacher_assignment
(teacher_id, course_id, grade_id, section_id, academic_period_id)
VALUES
(1, 1,
 (SELECT grade_id FROM grade WHERE name = '1° Secundaria'),
 (SELECT section_id FROM section WHERE name = 'A'
  AND grade_id = (SELECT grade_id FROM grade WHERE name = '1° Secundaria')),
 1),

(2, 2,
 (SELECT grade_id FROM grade WHERE name = '1° Secundaria'),
 (SELECT section_id FROM section WHERE name = 'A'
  AND grade_id = (SELECT grade_id FROM grade WHERE name = '1° Secundaria')),
 1),

(3, 3,
 (SELECT grade_id FROM grade WHERE name = '1° Secundaria'),
 (SELECT section_id FROM section WHERE name = 'A'
  AND grade_id = (SELECT grade_id FROM grade WHERE name = '1° Secundaria')),
 1),

(4, 4,
 (SELECT grade_id FROM grade WHERE name = '1° Secundaria'),
 (SELECT section_id FROM section WHERE name = 'A'
  AND grade_id = (SELECT grade_id FROM grade WHERE name = '1° Secundaria')),
 1),

(5, 5,
 (SELECT grade_id FROM grade WHERE name = '1° Secundaria'),
 (SELECT section_id FROM section WHERE name = 'A'
  AND grade_id = (SELECT grade_id FROM grade WHERE name = '1° Secundaria')),
 1);
GO

-- =============================================
-- 10. REGISTRO DE NOTAS
-- =============================================
INSERT INTO grade_record
(student_id, assigment_id, academic_period_id,
 evaluation_name, score, evaluation_date, observations)
VALUES
(1, 1, 1, 'Practica calificada 1', 18.00, '2026-04-10', 'Buen desempeño'),
(2, 1, 1, 'Practica calificada 1', 16.00, '2026-04-10', 'Debe practicar más'),
(3, 1, 1, 'Practica calificada 1', 14.00, '2026-04-10', 'En proceso'),
(4, 1, 1, 'Practica calificada 1', 19.00, '2026-04-10', 'Excelente desempeño'),
(5, 1, 1, 'Practica calificada 1', 17.00, '2026-04-10', 'Buen desempeño'),

(1, 2, 1, 'Comprension lectora', 17.00, '2026-04-15', 'Buen análisis'),
(2, 2, 1, 'Comprension lectora', 18.00, '2026-04-15', 'Excelente comprensión'),
(3, 2, 1, 'Comprension lectora', 15.00, '2026-04-15', 'Puede mejorar'),
(4, 2, 1, 'Comprension lectora', 16.00, '2026-04-15', 'Buen trabajo'),
(5, 2, 1, 'Comprension lectora', 14.00, '2026-04-15', 'Requiere refuerzo');
GO

-- =============================================
-- 11. ASISTENCIA DE ESTUDIANTES
-- =============================================
INSERT INTO attendance
(student_id, academic_period_id, attendance_date, status, observations)
VALUES
(1, 1, '2026-04-01', 'PRESENTE', NULL),
(2, 1, '2026-04-01', 'PRESENTE', NULL),
(3, 1, '2026-04-01', 'TARDANZA', 'Ingreso tardío'),
(4, 1, '2026-04-01', 'FALTA', 'Pendiente de justificar'),
(5, 1, '2026-04-01', 'PRESENTE', NULL);
GO

-- =============================================
-- 12. ASISTENCIA DE DOCENTES
-- =============================================
INSERT INTO teacher_attendance
(teacher_id, attendance_date, check_in, check_out, status, observations)
VALUES
(1, '2026-04-01', '07:30', '15:00', 'PRESENTE', NULL),
(2, '2026-04-01', '07:35', '15:00', 'PRESENTE', NULL),
(3, '2026-04-01', '07:50', '15:00', 'TARDANZA', 'Llegada tardía'),
(4, '2026-04-01', '07:30', '15:00', 'PRESENTE', NULL),
(5, '2026-04-01', '07:30', '15:00', 'PRESENTE', NULL);
GO

-- =============================================
-- 13. USUARIOS Y ROLES
-- IMPORTANTE: contraseñas de prueba; sustituir
-- por hashes BCrypt reales antes de iniciar sesión.
-- =============================================
INSERT INTO users
(username, password_hash, role, teacher_id, student_id, status)
VALUES
('admin', 'CAMBIAR_POR_HASH_BCRYPT', 'ADMINISTRADOR', NULL, NULL, 'ACTIVO'),
('carlos.ramirez', 'CAMBIAR_POR_HASH_BCRYPT', 'PROFESOR', 1, NULL, 'ACTIVO'),
('maria.lopez', 'CAMBIAR_POR_HASH_BCRYPT', 'PROFESOR', 2, NULL, 'ACTIVO'),
('est0001', 'CAMBIAR_POR_HASH_BCRYPT', 'ESTUDIANTE', NULL, 1, 'ACTIVO'),
('est0002', 'CAMBIAR_POR_HASH_BCRYPT', 'ESTUDIANTE', NULL, 2, 'ACTIVO');
GO

-- =============================================
-- 14. VERIFICAR CANTIDAD DE REGISTROS
-- =============================================
SELECT 'academic_period' AS tabla, COUNT(*) AS registros FROM academic_period
UNION ALL SELECT 'grade', COUNT(*) FROM grade
UNION ALL SELECT 'section', COUNT(*) FROM section
UNION ALL SELECT 'teacher', COUNT(*) FROM teacher
UNION ALL SELECT 'student', COUNT(*) FROM student
UNION ALL SELECT 'guardian', COUNT(*) FROM guardian
UNION ALL SELECT 'student_guardian', COUNT(*) FROM student_guardian
UNION ALL SELECT 'course', COUNT(*) FROM course
UNION ALL SELECT 'teacher_assignment', COUNT(*) FROM teacher_assignment
UNION ALL SELECT 'grade_record', COUNT(*) FROM grade_record
UNION ALL SELECT 'attendance', COUNT(*) FROM attendance
UNION ALL SELECT 'teacher_attendance', COUNT(*) FROM teacher_attendance
UNION ALL SELECT 'users', COUNT(*) FROM users;
GO
