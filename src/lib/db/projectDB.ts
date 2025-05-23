import { ProjectTemplate } from "@/types/type";


const PROJECT_TEMPLATES: ProjectTemplate[] = [
  {
    // id: "37bfb83b-dd64-410b-81c5-7374b0c453e0",
    id:"2972a3e0-dff6-4c0e-bb35-5ad939e2793c",
    name: "Shopify+",
    description: "e-commerce platform infrastructure design",
    initial_resources: [
      {
        id: "37bfb83b-dd64-410b-81c5-7374b0c453e0",
        temp_id: "compute-1",
        type: "Compute",
        position: { x: 500, y: 250 },
        status: 'add', 
        attribute: {
          plan: 'vc2-2c-2gb',
          status: "running",
          region_id: "ewr",
          main_ip: "64.176.217.21",
          label: "Shopify-Web-Server",
          os_id: "2571",
          auto_backups: "enable",
          firewall_group_id: "firewall-1"
        }
      },
      {
        id: "",
        temp_id: "objectstorage-1",
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
        id: "",
        temp_id: "blockstorage-1",
        type: "BlockStorage",
        position: { x: 500, y: 400 },
        status: 'add',
        attribute: {
          region_id: "ewr",
          type: "NVMe",
          mount_id: "ewr-a23cda1547af4b",
          attached_to_instance: "compute-1",
          size_gb: "1",
          label: "Shopify-Data-Volume",
        }
      },
      {
        id: "",
        temp_id: "database-1",
        type: "ManagedDatabase",
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
        id: "",
        temp_id: "firewall-1",
        type: "FirewallGroup",
        position: { x: 500, y: 100 },
        status: 'add',
        attribute: {
          description: "Allow HTTP",
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
    id: "2972a3e0-dff6-4c0e-bb35-5ad939e2793c",
    name: "Shopify+ HA",
    description: "e-commerce platform infrastructure design with high availability",
    initial_resources: [
      {
        id: "",
        temp_id: "compute-1",
        type: "Compute",
        position: { x: 500, y: 250 },
        status: 'add', 
        attribute: {
          plan: 'vc2-2c-2gb',
          status: "running",
          region_id: "ewr",
          main_ip: "64.176.217.21",
          label: "Shopify-Web-Server",
          os_id: "2571",
          auto_backups: "enable",
          firewall_group_id: "firewall-1"
        }
      },
      {
        id: "",
        temp_id: "compute-2",
        type: "Compute",
        position: { x: 600, y: 150 },
        status: 'add', 
        attribute: {
          plan: 'vc2-4c-8gb',
          status: "running",
          region_id: "ord",
          main_ip: "192.168.1.102",
          label: "Shopify-Web-Server-Secondary",
          os_id: "2571",
          auto_backups: "disable",
          firewall_group_id: "firewall-1"
        }
      },
      {
        id: "",
        temp_id: "block-1",
        type: "BlockStorage",
        position: { x: 400, y: 300 },
        status: 'add',
        attribute: {
          region_id: "ord",
          type: "NVMe",
          mount_id: "ord-b47cda1547af9c",
          attached_to_instance: "compute-1",
          size_gb: "500",
          label: "Shopify-Data-Primary",
        }
      },
      {
        id: "",
        temp_id: "block-2",
        type: "BlockStorage",
        position: { x: 600, y: 300 },
        status: 'add',
        attribute: {
          region_id: "ord",
          type: "NVMe",
          mount_id: "ord-c58eda1896af3d",
          attached_to_instance: "compute-2",
          size_gb: "500",
          label: "Shopify-Data-Secondary",
        }
      },
      {
        id: "",
        temp_id: "database-1",
        type: "ManagedDatabase",
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
        id: "",
        temp_id: "firewall-1",
        type: "FirewallGroup",
        position: { x: 500, y: 50 },
        status: 'add',
        attribute: {
          description: "HA-Protection-Layer",
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
        id: "",
        temp_id: "compute-1",
        type: "Compute",
        position: { x: 400, y: 200 },
        status: 'add', 
        attribute: {
          plan: 'vc2-2c-4gb',
          status: "running",
          region_id: "sea",
          main_ip: "10.0.1.101",
          label: "Shopify-API-Gateway",
          os_id: "2571",
          auto_backups: "enable",
          firewall_group_id: "firewall-1"
        }
      },
      {
        id: "",
        temp_id: "compute-2",
        type: "Compute",
        position: { x: 600, y: 200 },
        status: 'add', 
        attribute: {
          plan: 'vc2-2c-4gb',
          status: "running",
          region_id: "sea",
          main_ip: "10.0.1.102",
          label: "Shopify-Auth-Service",
          os_id: "2571",
          auto_backups: "enable",
          firewall_group_id: "firewall-1"
        }
      },
      {
        id: "",
        temp_id: "database-1",
        type: "ManagedDatabase",
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
        id: "",
        temp_id: "database-2",
        type: "ManagedDatabase",
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
        id: "",
        temp_id: "storage-1",
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
        id: "",
        temp_id: "firewall-1",
        type: "FirewallGroup",
        position: { x: 500, y: 100 },
        status: 'add',
        attribute: {
          description: "API-Gateway-Protection",
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