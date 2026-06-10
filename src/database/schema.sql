CREATE DATABASE IF NOT EXISTS pets_db;
USE pets_db;

CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        role ENUM ('admin', 'adopter') NOT NULL DEFAULT 'adopter'
    );

CREATE TABLE IF NOT EXISTS pets (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        age INT NOT NULL,
        species ENUM('dog', 'cat', 'bird', 'other') NOT NULL,
        size ENUM ('small', 'medium', 'large') NOT NULL,
        status ENUM ('available', 'adopted') NOT NULL DEFAULT 'available',
        description TEXT NULL
    );

CREATE TABLE IF NOT EXISTS adoptions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        pet_id INT NOT NULL,
        adoption_date DATETIME DEFAULT CURRENT_TIMESTAMP,

        -- Restrições de chave estrangeira --
        CONSTRAINT fk_adoption_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
        CONSTRAINT fk_adoption_pet FOREIGN KEY (pet_id) REFERENCES pets (id) ON DELETE CASCADE,

        -- Um usuário não pode adotar o mesmo pet mais de uma vez --
        CONSTRAINT uq_user_pet UNIQUE (user_id, pet_id)
    );

-- Inserts --
INSERT INTO users (name, email, password, phone, role) VALUES
    (
        'Administrador',
        'admin@gmail.com',
        '111111',
        '(54) 99999-9999',
        'admin'
    ),
    (
        'Adotante',
        'adotante@gmail.com',
        '222222',
        '(54) 9888-8888',
        'adopter'
    );

INSERT INTO pets (name, age, species, size, status, description) VALUES
    (
        'Frederico',
        1,
        'dog',
        'small',
        'available',
        'Cachorrinho travesso e brincalhão.'
    ),
    (
        'Tom',
        3,
        'cat',
        'large',
        'available',
        'Gatinho dócil, brincalhão e muito inteligente.'
    ),
    (
        'Niko',
        1,
        'cat',
        'medium',
        'available',
        'Gatinho carinhoso e tranquilo.'
    );