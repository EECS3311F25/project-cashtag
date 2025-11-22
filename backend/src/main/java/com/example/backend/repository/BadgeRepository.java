package com.example.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.model.Badge;
import com.example.backend.model.BadgeEventType;

public interface BadgeRepository extends JpaRepository<Badge, Long> {

    List<Badge> findByEventType(BadgeEventType eventType);}
