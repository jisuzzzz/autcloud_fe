import { ProjectTemplate } from "@/types/type";


const PROJECT_TEMPLATES: ProjectTemplate[] = [
  {
    id: "37bfb83b-dd64-410b-81c5-7374b0c453e0",
    name: "Shopify+",
    description: "e-commerce platform infrastructure design",
    initial_resources: [
      {
        id: "compute-1",
        type: "Compute",
        position: { x: 500, y: 250 },
        status: 'add', 
        attribute: {
          plan: 'vc2-2c-2gb',
          status: "running",
          region_id: "ewr",
          ip_address: "64.176.217.21",
          label: "Shopify-Web-Server",
          os_id: "2571",
          auto_backups: "enable",
          group_id: "firewall-1"
        }
      },
      {
        id: "storage-1",
        type: "ObjectStorage",
        position: { x: 350, y: 400 },
        status: 'add',
        attribute: {
          cluster_id: "2",
          tier_id: "2",
          label: "Shopify-Asset-Storage",
        }
      },
      {
        id: "block-1",
        type: "BlockStorage",
        position: { x: 500, y: 400 },
        status: 'add',
        attribute: {
          region_id: "ewr",
          type: "NVMe",
          mount_id: "ewr-a23cda1547af4b",
          attached_to: "compute-1",
          size: "1",
          label: "Shopify-Data-Volume",
        }
      },
      {
        id: "db-1",
        type: "Database",
        position: { x: 650, y: 400 },
        status: 'add',
        attribute: {
          status: "pending",
          plan: "vultr-dbaas-hobbyist-cc-1-25-1",
          db_engine: "pg",
          db_version: "15",
          latest_backup: "2 hours ago",
          region_id: "ewr",
          label: "Shopify-PostgreSQL-DB",
        }
      },
      {
        id: "firewall-1",
        type: "FireWall",
        position: { x: 500, y: 100 },
        status: 'add',
        attribute: {
          label: "Allow HTTP",
          rules: [
            {
              rule_id: "1",
              action: "accept",
              port: "80",
              ip_type: "v4",
              protocol: "tcp",
              subnet: "0.0.0.0",
              subnet_size: 0,
              notes: "Public HTTP access"
            },
          ]
        }
      }
    ]
  },

  {
    id: "8ab36845-d77c-482f-b9e3-5a4c31f89d52",
    name: "Shopify+ HA",
    description: "e-commerce platform infrastructure design with high availability",
    initial_resources: [
      {
        id: "compute-1",
        type: "Compute",
        position: { x: 500, y: 250 },
        status: 'add', 
        attribute: {
          plan: 'vc2-2c-2gb',
          status: "running",
          region_id: "ewr",
          ip_address: "64.176.217.21",
          label: "Shopify-Web-Server",
          os_id: "2571",
          auto_backups: "enable",
          group_id: "firewall-1"
        }
      },
      {
        id: "compute-2",
        type: "Compute",
        position: { x: 600, y: 150 },
        status: 'add', 
        attribute: {
          plan: 'vc2-4c-8gb',
          status: "running",
          region_id: "ord",
          ip_address: "192.168.1.102",
          label: "Shopify-Web-Server-Secondary",
          os_id: "2571",
          auto_backups: "disable",
          group_id: "firewall-1"
        }
      },
      {
        id: "block-1",
        type: "BlockStorage",
        position: { x: 400, y: 300 },
        status: 'add',
        attribute: {
          region_id: "ord",
          type: "NVMe",
          mount_id: "ord-b47cda1547af9c",
          attached_to: "compute-1",
          size: "500",
          label: "Shopify-Data-Primary",
        }
      },
      {
        id: "block-2",
        type: "BlockStorage",
        position: { x: 600, y: 300 },
        status: 'add',
        attribute: {
          region_id: "ord",
          type: "NVMe",
          mount_id: "ord-c58eda1896af3d",
          attached_to: "compute-2",
          size: "500",
          label: "Shopify-Data-Secondary",
        }
      },
      {
        id: "db-1",
        type: "Database",
        position: { x: 500, y: 450 },
        status: 'add',
        attribute: {
          status: "running",
          plan: "vultur-dbaas-business-cc-4-16-4",
          db_engine: "pg",
          db_version: "15",
          latest_backup: "3 hours ago",
          region_id: "ord",
          label: "Shopify-PostgreSQL-Cluster",
        }
      },
      {
        id: "firewall-1",
        type: "FireWall",
        position: { x: 500, y: 50 },
        status: 'add',
        attribute: {
          label: "HA-Protection-Layer",
          rules: [
            {
              rule_id: "1",
              action: "accept",
              port: "80,443",
              ip_type: "v4",
              protocol: "tcp",
              subnet: "0.0.0.0",
              subnet_size: 0,
              notes: "Load Balancer Access"
            }
          ]
        }
      }
    ]
  },
  
  {
    id: "5cd92f34-a17b-429d-8e35-9bf72c680d13",
    name: "Shopify+ Microservices",
    description: "e-commerce platform infrastructure design with microservices architecture",
    initial_resources: [
      {
        id: "compute-1",
        type: "Compute",
        position: { x: 400, y: 200 },
        status: 'add', 
        attribute: {
          plan: 'vc2-2c-4gb',
          status: "running",
          region_id: "sea",
          ip_address: "10.0.1.101",
          label: "Shopify-API-Gateway",
          os_id: "2571",
          auto_backups: "enable",
          group_id: "firewall-1"
        }
      },
      {
        id: "compute-2",
        type: "Compute",
        position: { x: 600, y: 200 },
        status: 'add', 
        attribute: {
          plan: 'vc2-2c-4gb',
          status: "running",
          region_id: "sea",
          ip_address: "10.0.1.102",
          label: "Shopify-Auth-Service",
          os_id: "2571",
          auto_backups: "enable",
          group_id: "firewall-1"
        }
      },
      {
        id: "db-1",
        type: "Database",
        position: { x: 400, y: 380 },
        status: 'add',
        attribute: {
          status: "running",
          plan: "vultur-dbaas-business-cc-2-8-2",
          db_engine: "pg",
          db_version: "15",
          latest_backup: "1 hour ago",
          region_id: "sea",
          label: "Shopify-Product-DB",
        }
      },
      {
        id: "db-2",
        type: "Database",
        position: { x: 600, y: 380 },
        status: 'add',
        attribute: {
          status: "running",
          plan: "vultur-dbaas-business-cc-2-8-2",
          db_engine: "pg",
          db_version: "15",
          latest_backup: "1 hour ago",
          region_id: "sea",
          label: "Shopify-Order-DB",
        }
      },
      {
        id: "storage-1",
        type: "ObjectStorage",
        position: { x: 500, y: 550 },
        status: 'add',
        attribute: {
          cluster_id: "2",
          tier_id: "3",
          label: "Shopify-Media-Storage",
        }
      },
      {
        id: "firewall-1",
        type: "FireWall",
        position: { x: 500, y: 100 },
        status: 'add',
        attribute: {
          label: "API-Gateway-Protection",
          rules: [
            {
              rule_id: "1",
              action: "accept",
              port: "443",
              ip_type: "v4",
              protocol: "tcp",
              subnet: "0.0.0.0",
              subnet_size: 0,
              notes: "API Gateway Access"
            }
          ]
        }
      }
    ]
  }
]

// 프로젝트 관련 함수들
export function getProjectById(id: string) {
  return PROJECT_TEMPLATES.find((p) => p.id === id) || null;
}

export function getProjects() {
  return PROJECT_TEMPLATES.map(project => ({
    id: project.id,
    name: project.name,
    description: project.description,
    initial_resources: project.initial_resources
  }));
}