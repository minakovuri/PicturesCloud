﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using WebApi.Repositories.DbContexts;

namespace WebApi.Migrations
{
    [DbContext(typeof(MySqlContext))]
    [Migration("20201007171834_UpdateUserPasswordFields")]
    partial class UpdateUserPasswordFields
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("WebApi.Repositories.Entities.Content", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Discriminator")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int?>("FolderId")
                        .HasColumnType("int");

                    b.Property<int>("Name")
                        .HasColumnType("int");

                    b.Property<int?>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("FolderId");

                    b.HasIndex("UserId");

                    b.ToTable("Contents");

                    b.HasDiscriminator<string>("Discriminator").HasValue("Content");
                });

            modelBuilder.Entity("WebApi.Repositories.Entities.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Login")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("PasswordSalt")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("WebApi.Repositories.Entities.Folder", b =>
                {
                    b.HasBaseType("WebApi.Repositories.Entities.Content");

                    b.HasDiscriminator().HasValue("Folder");
                });

            modelBuilder.Entity("WebApi.Repositories.Entities.Image", b =>
                {
                    b.HasBaseType("WebApi.Repositories.Entities.Content");

                    b.Property<string>("Path")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<bool>("Starred")
                        .HasColumnType("bit");

                    b.HasDiscriminator().HasValue("Image");
                });

            modelBuilder.Entity("WebApi.Repositories.Entities.Content", b =>
                {
                    b.HasOne("WebApi.Repositories.Entities.Folder", "Folder")
                        .WithMany()
                        .HasForeignKey("FolderId");

                    b.HasOne("WebApi.Repositories.Entities.User", null)
                        .WithMany("Contents")
                        .HasForeignKey("UserId");
                });
#pragma warning restore 612, 618
        }
    }
}
