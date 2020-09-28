﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using WebApi.Repositories.DbContexts;

namespace WebApi.Migrations
{
    [DbContext(typeof(MySqlContext))]
    partial class MySqlContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
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

                    b.Property<string>("Avatar")
                        .HasColumnType("text");

                    b.Property<string>("Login")
                        .HasColumnType("text");

                    b.Property<string>("Password")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("WebApi.Repositories.Entities.File", b =>
                {
                    b.HasBaseType("WebApi.Repositories.Entities.Content");

                    b.Property<bool>("AddedToFavourites")
                        .HasColumnType("bit");

                    b.Property<string>("Path")
                        .HasColumnType("text");

                    b.HasDiscriminator().HasValue("File");
                });

            modelBuilder.Entity("WebApi.Repositories.Entities.Folder", b =>
                {
                    b.HasBaseType("WebApi.Repositories.Entities.Content");

                    b.HasDiscriminator().HasValue("Folder");
                });

            modelBuilder.Entity("WebApi.Repositories.Entities.Content", b =>
                {
                    b.HasOne("WebApi.Repositories.Entities.Folder", null)
                        .WithMany("Contents")
                        .HasForeignKey("FolderId");

                    b.HasOne("WebApi.Repositories.Entities.User", null)
                        .WithMany("Contents")
                        .HasForeignKey("UserId");
                });
#pragma warning restore 612, 618
        }
    }
}
